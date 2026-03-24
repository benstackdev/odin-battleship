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

  shipSelectDiv: HTMLDivElement | null = document.querySelector(".ship-select");
  randomizeBoardButton: HTMLButtonElement | null = document.querySelector(".randomize-board");
  startGameButton: HTMLButtonElement | null = document.querySelector("button.start-game");
  currentTurnDiv: HTMLDivElement | null = document.querySelector(".turn span.current-turn");

  private _humanPlayer: HumanPlayer;
  private _computerPlayer: ComputerPlayer;

  private _currentTurn: Player;
  private _computerTurnDelay: number = 1000;

  private _gameState: GameState;

  constructor() {
    this._humanPlayer = new HumanPlayer();
    this._computerPlayer = new ComputerPlayer();
    this._gameState = GameState.SETUP;

    this._currentTurn = this._humanPlayer;
    this.currentTurnDiv!.textContent = "You";

    this.startGameButton?.addEventListener("click", () => {
      if (this._gameState === GameState.SETUP) {
        this._gameState = GameState.PLAYING;
        this._humanPlayer.canMoveShips = false;
      }
      this.startGameButton!.style.visibility = "hidden";
      this.randomizeBoardButton!.style.visibility = "hidden";
      this.humanTurnInit();
    });

    this.randomizeBoardButton?.addEventListener("click", () => {
      if (this._gameState === GameState.SETUP) {
        this._humanPlayer.randomizeShipLocations();
      }
    });

    this.setupGameInit();
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
    let attackCoordinate = this.computerFindAttack();

    let wasHit = this._computerPlayer.sendAttack(this._humanPlayer, attackCoordinate[0], attackCoordinate[1]);
    console.log(`${attackCoordinate[0]}, ${attackCoordinate[1]}: ${wasHit}`);
    while (wasHit) {
      await sleep(this._computerTurnDelay);
      attackCoordinate = this.computerFindAttack();
      wasHit = this._computerPlayer.sendAttack(this._humanPlayer, attackCoordinate[0], attackCoordinate[1]);
      console.log(`${attackCoordinate[0]}, ${attackCoordinate[1]}: ${wasHit}`);
    }

    this.toggleTurn();
  }

  // TODO: refactor to only select among available positions
  computerFindAttack(): [Coordinate, Coordinate] {
    const humanGameBoard = this._humanPlayer.playerBoard;
    let turnX = Math.floor(Math.random() * 10) as Coordinate;
    let turnY = Math.floor(Math.random() * 10) as Coordinate;
    while (humanGameBoard.board[turnX][turnY].isHit !== false) {
      turnX = Math.floor(Math.random() * 10) as Coordinate;
      turnY = Math.floor(Math.random() * 10) as Coordinate;
    }
    return [turnX, turnY];
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
}
