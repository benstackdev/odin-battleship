import {} from "./ship.js";
import { GameBoard } from "./gameboard.js";
class Player {
    _playerBoard;
    constructor(board) {
        this._playerBoard = board;
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
    constructor(board) {
        super(board);
    }
}
class ComputerPlayer extends Player {
    constructor(board) {
        super(board);
    }
}
export { Player, HumanPlayer, ComputerPlayer };
//# sourceMappingURL=player.js.map