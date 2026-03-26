import type { Coordinate } from "../types/battleship_types.js";
import { HumanPlayer, ComputerPlayer, Player } from "./player.js";

export enum GameState {
  SETUP = 1,
  PLAYING = 2,
  END = 3
}

export enum PlayerID {
  HUMAN = 1,
  COMPUTER = 2
}

/* Game state manager */
export class Game {
  readonly BOARD_SIZE = 10;

  gameSetupElements = document.querySelectorAll(".game-setup") as NodeListOf<HTMLElement>;
  gamePlayingElements = document.querySelectorAll(".game-playing") as NodeListOf<HTMLElement>;
  gameEndElements = document.querySelectorAll(".game-end") as NodeListOf<HTMLElement>;

  randomizeBoardButton: HTMLButtonElement = document.querySelector(".randomize-board") as HTMLButtonElement;
  startGameButton: HTMLButtonElement = document.querySelector("button.start-game") as HTMLButtonElement;
  newGameButton: HTMLButtonElement = document.querySelector("button.new-game") as HTMLButtonElement;
  
  turnDiv: HTMLDivElement = document.querySelector(".turn") as HTMLDivElement;
  currentTurnDiv: HTMLDivElement = document.querySelector(".turn span.current-turn") as HTMLDivElement;
  winnerDiv: HTMLSpanElement = document.querySelector("span.game-winner") as HTMLSpanElement;

  private _humanPlayer: HumanPlayer;
  private _computerPlayer: ComputerPlayer;

  private _currentTurn: Player;
  private _computerTurnDelay: number = 500;

  private _gameState: GameState;

  constructor() {
    this._humanPlayer = new HumanPlayer();
    this._computerPlayer = new ComputerPlayer();
    this._gameState = GameState.SETUP;
    this._updateElementVisibility();

    this._currentTurn = this._humanPlayer;
    this.currentTurnDiv.textContent = "You";
    
    this.startGameButton.addEventListener("click", () => {
      if (this._gameState === GameState.SETUP) {
        this._gameState = GameState.PLAYING;
        this._updateElementVisibility();
        this._humanPlayer.canMoveShips = false;
      }
      this.humanTurnInit();
    });

    this.randomizeBoardButton.addEventListener("click", () => {
      if (this._gameState === GameState.SETUP) {
        this._humanPlayer.randomizeShipLocations();
      }
    });

    this.newGameButton.addEventListener("click", () => {
      if (this._gameState === GameState.END) {
        this._gameState = GameState.SETUP;
        this._updateElementVisibility();
        // TODO: reset board state on game restart
      }
    })

    this.setupGameInit();
  }

  private _updateElementVisibility() {
    switch(this._gameState) {
      
      case GameState.SETUP:
        this.gameSetupElements.forEach(elem => elem.style.visibility = "visible");
        this.gamePlayingElements.forEach(elem => elem.style.visibility = "hidden");
        this.gameEndElements.forEach(elem => elem.style.visibility = "hidden");
        break;

      case GameState.PLAYING:
        this.gamePlayingElements.forEach(elem => elem.style.visibility = "visible");
        this.gameSetupElements.forEach(elem => elem.style.visibility = "hidden");
        this.gameEndElements.forEach(elem => elem.style.visibility = "hidden");
        break;
      
      case GameState.END:
        this.gameEndElements.forEach(elem => elem.style.visibility = "visible");
        this.gameSetupElements.forEach(elem => elem.style.visibility = "hidden");
        this.gamePlayingElements.forEach(elem => elem.style.visibility = "hidden");

    }
  }

  setupGameInit() {
    this._humanPlayer.initPlayerShips();
    this._computerPlayer.initPlayerShips();
  }

  // TODO: Check win condition on each turn and change game state
  humanTurnInit() {
    // set up listeners for computer board cells so player can send attacks
    const computerGameBoard = this._computerPlayer.playerBoard;
    
    for (let i = 0 as Coordinate; i < this.BOARD_SIZE; i++) {
      for (let j = 0 as Coordinate; j < this.BOARD_SIZE; j++) {
        const computerGameCell = document.querySelector(`.x${computerGameBoard.id}-${i}.y${computerGameBoard.id}-${j}`);
        
        // listen for human clicking computer board on their turn
        computerGameCell?.addEventListener("click", (e) => {
          e.preventDefault();
          // already been hit, early return
          if (computerGameCell.classList.contains("hit")) return;

          if (this._currentTurn === this._humanPlayer) {
            const wasHit = this._humanPlayer.sendAttack(this._computerPlayer, i, j);
            if (!wasHit) this.toggleTurn();
            if (this._computerPlayer.allSunk()) this._gameOver("You");
          }
        });
      }
    }
  }

  async computerTurn() {
    const sleep = (ms: number) => { return new Promise(r => setTimeout(r, ms)); }
    
    // wait for delay, then make move
    await sleep(this._computerTurnDelay);
    
    // choose non-hit random position and send a hit
    let attackCoordinate = this._computerPlayer.findAttack();

    let wasHit = this._computerPlayer.sendAttack(this._humanPlayer, attackCoordinate[0], attackCoordinate[1]);
    console.log(`${attackCoordinate[0]}, ${attackCoordinate[1]}: ${wasHit}`);
    while (wasHit) {
      if (this._humanPlayer.allSunk()) this._gameOver("Computer");
      this._computerPlayer.addToShipHit(attackCoordinate);
      await sleep(this._computerTurnDelay);
      attackCoordinate = this._computerPlayer.findAttack();
      wasHit = this._computerPlayer.sendAttack(this._humanPlayer, attackCoordinate[0], attackCoordinate[1]);
      console.log(`${attackCoordinate[0]}, ${attackCoordinate[1]}: ${wasHit}`);
    }

    this.toggleTurn();
  }

  toggleTurn() {
    if (this._currentTurn === this._humanPlayer) {
      this._currentTurn = this._computerPlayer;
      this.computerTurn();
      this.currentTurnDiv!.textContent = "Computer";
    } else {
      this._currentTurn = this._humanPlayer;
      this.currentTurnDiv!.textContent = "You";
    }
  }

  private _gameOver(winner: string) {
    this._gameState = GameState.END;
    this._updateElementVisibility();  
    this.winnerDiv.textContent = winner;
  }
}
