import {} from "./ship.js";
import { GameBoard } from "./gameboard.js";
class Player {
    _playerBoard;
    constructor() {
        this._playerBoard = new GameBoard();
    }
    get playerBoard() { return this._playerBoard; }
    placeShip(len, x = 0, y = 0) {
        this._playerBoard.createShip(len, x, y);
    }
    attack(opponent, x, y) {
        return opponent.playerBoard.receiveAttack(x, y);
    }
}
class HumanPlayer extends Player {
    constructor() {
        super();
    }
}
class ComputerPlayer extends Player {
    constructor() {
        super();
    }
}
export { Player, HumanPlayer, ComputerPlayer };
//# sourceMappingURL=player.js.map