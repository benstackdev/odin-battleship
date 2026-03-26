import { HumanPlayer, ComputerPlayer, Player } from "./player.js";
export var GameState;
(function (GameState) {
    GameState[GameState["SETUP"] = 1] = "SETUP";
    GameState[GameState["PLAYING"] = 2] = "PLAYING";
    GameState[GameState["END"] = 3] = "END";
})(GameState || (GameState = {}));
export var PlayerID;
(function (PlayerID) {
    PlayerID[PlayerID["HUMAN"] = 1] = "HUMAN";
    PlayerID[PlayerID["COMPUTER"] = 2] = "COMPUTER";
})(PlayerID || (PlayerID = {}));
/* Game state manager */
export class Game {
    BOARD_SIZE = 10;
    gameSetupElements = document.querySelectorAll(".game-setup");
    gamePlayingElements = document.querySelectorAll(".game-playing");
    gameEndElements = document.querySelectorAll(".game-end");
    randomizeBoardButton = document.querySelector(".randomize-board");
    startGameButton = document.querySelector("button.start-game");
    newGameButton = document.querySelector("button.new-game");
    turnDiv = document.querySelector(".turn");
    currentTurnDiv = document.querySelector(".turn span.current-turn");
    winnerDiv = document.querySelector("span.game-winner");
    _humanPlayer;
    _computerPlayer;
    _currentTurn;
    _computerTurnDelay = 500;
    _gameState;
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
        });
        this.setupGameInit();
    }
    _updateElementVisibility() {
        switch (this._gameState) {
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
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            for (let j = 0; j < this.BOARD_SIZE; j++) {
                const computerGameCell = document.querySelector(`.x${computerGameBoard.id}-${i}.y${computerGameBoard.id}-${j}`);
                // listen for human clicking computer board on their turn
                computerGameCell?.addEventListener("click", (e) => {
                    e.preventDefault();
                    // already been hit, early return
                    if (computerGameCell.classList.contains("hit"))
                        return;
                    if (this._currentTurn === this._humanPlayer) {
                        const wasHit = this._humanPlayer.sendAttack(this._computerPlayer, i, j);
                        if (!wasHit)
                            this.toggleTurn();
                        if (this._computerPlayer.allSunk())
                            this._gameOver("You");
                    }
                });
            }
        }
    }
    async computerTurn() {
        const sleep = (ms) => { return new Promise(r => setTimeout(r, ms)); };
        // wait for delay, then make move
        await sleep(this._computerTurnDelay);
        // choose non-hit random position and send a hit
        let attackCoordinate = this._computerPlayer.findAttack();
        let wasHit = this._computerPlayer.sendAttack(this._humanPlayer, attackCoordinate[0], attackCoordinate[1]);
        console.log(`${attackCoordinate[0]}, ${attackCoordinate[1]}: ${wasHit}`);
        while (wasHit) {
            if (this._humanPlayer.allSunk())
                this._gameOver("Computer");
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
            this.currentTurnDiv.textContent = "Computer";
        }
        else {
            this._currentTurn = this._humanPlayer;
            this.currentTurnDiv.textContent = "You";
        }
    }
    _gameOver(winner) {
        this._gameState = GameState.END;
        this._updateElementVisibility();
        this.winnerDiv.textContent = winner;
    }
}
//# sourceMappingURL=game.js.map