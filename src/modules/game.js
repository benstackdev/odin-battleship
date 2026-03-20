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
        const ship1 = this._humanPlayer.createShip(3, undefined, undefined, ShipOrientation.HORIZONTAL);
        console.log(`${ship1.x}, ${ship1.y}`);
    }
}
//# sourceMappingURL=game.js.map