import { HumanPlayer, ComputerPlayer } from "./player.js";
import { ShipOrientation } from "./ship.js";
export var GameState;
(function (GameState) {
    GameState[GameState["SETUP"] = 1] = "SETUP";
    GameState[GameState["PLAYING"] = 2] = "PLAYING";
    GameState[GameState["END"] = 3] = "END";
})(GameState || (GameState = {}));
/* Game state manager */
export class Game {
    shipSelectDiv = document.querySelector(".ship-select");
    _humanPlayer;
    _computerPlayer;
    _gameState;
    constructor() {
        this._humanPlayer = new HumanPlayer();
        this._computerPlayer = new ComputerPlayer();
        this._gameState = GameState.SETUP;
        this.setupGameInit();
    }
    setupGameInit() {
        this._humanPlayer.initPlayerShips();
        this._computerPlayer.initPlayerShips();
        // set up display for draggable ship objects
    }
}
//# sourceMappingURL=game.js.map