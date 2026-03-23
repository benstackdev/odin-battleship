import { HumanPlayer, ComputerPlayer, Player } from "./player.js";
import { ShipDraggable } from "./ship_draggable.js";
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
    shipSelectDiv = document.querySelector(".ship-select");
    startGameButton = document.querySelector("button.start-game");
    currentTurnDiv = document.querySelector(".turn span.current-turn");
    _humanPlayer;
    _computerPlayer;
    _currentTurn;
    _computerTurnDelay = 1000;
    _gameState;
    constructor() {
        this._humanPlayer = new HumanPlayer();
        this._computerPlayer = new ComputerPlayer();
        this._gameState = GameState.SETUP;
        this._currentTurn = this._humanPlayer;
        this.currentTurnDiv.textContent = "You";
        this.startGameButton?.addEventListener("click", () => {
            if (this._gameState === GameState.SETUP)
                this._gameState = GameState.PLAYING;
            this.startGameButton.style.visibility = "hidden";
            this.humanTurnInit();
        });
        this.setupGameInit();
    }
    setupGameInit() {
        this._humanPlayer.initPlayerShips();
        this._computerPlayer.initPlayerShips();
        // set up display for draggable ship objects
        for (const ship of this._humanPlayer.playerShips) {
            let shipSelectContainer;
            switch (ship.length) {
                case 4:
                    shipSelectContainer = document.querySelector(`.ship-select-container:first-child`);
                    console.log(shipSelectContainer);
                    break;
                case 3:
                    shipSelectContainer = document.querySelector(`.ship-select-container:nth-child(2)`);
                    break;
                case 2:
                    shipSelectContainer = document.querySelector(`.ship-select-container:nth-child(3)`);
                    break;
                case 1:
                    shipSelectContainer = document.querySelector(`.ship-select-container:last-child`);
                    break;
            }
            const draggableShip = new ShipDraggable(ship);
            shipSelectContainer?.appendChild(draggableShip.element);
        }
    }
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
    computerFindAttack() {
        const humanGameBoard = this._humanPlayer.playerBoard;
        let turnX = Math.floor(Math.random() * 10);
        let turnY = Math.floor(Math.random() * 10);
        while (humanGameBoard.board[turnX][turnY].isHit !== false) {
            turnX = Math.floor(Math.random() * 10);
            turnY = Math.floor(Math.random() * 10);
        }
        return [turnX, turnY];
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
}
//# sourceMappingURL=game.js.map