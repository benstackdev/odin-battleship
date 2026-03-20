import { Ship, ShipOrientation } from "./ship.js";
import { GameBoard } from "./gameboard.js";
class Player {
    BOARD_SIZE = 10;
    _playerBoard;
    _playerShips;
    constructor() {
        this._playerBoard = new GameBoard();
        this._playerShips = [];
    }
    get playerBoard() { return this._playerBoard; }
    get playerShips() { return this._playerShips; }
    createShip(len, x = 0, y = 0, orientation) {
        const newShip = new Ship(len, x, y, orientation);
        if (this._playerBoard.isValidShipPosition(newShip)) {
            this._playerShips.push(newShip);
            this._playerBoard.updateBoard(this._playerShips);
        }
        return newShip;
    }
    transformShip(ship, newx, newy, flip = false) {
        if (this._playerShips.includes(ship)) {
            const oldx = ship.x;
            const oldy = ship.y;
            ship.x = newx;
            ship.y = newy;
            if (flip)
                ship.flip();
            if (this._playerBoard.isValidShipPosition(ship)) {
                this._playerBoard.updateBoard(this._playerShips);
                return true;
            }
            else {
                ship.x = oldx;
                ship.y = oldy;
                if (flip)
                    ship.flip();
                return false;
            }
        }
        else
            return false;
    }
    sendAttack(opponent, x, y) {
        return opponent.receiveAttack(x, y);
    }
    receiveAttack(x, y) {
        // iterate through ships, find location, and hit ship if not already
        for (const ship of this._playerShips) {
            for (let i = 0; i < ship.length; i++) {
                const xoff = (ship.orientation === ShipOrientation.HORIZONTAL) ? i : 0;
                const yoff = (ship.orientation === ShipOrientation.VERTICAL) ? i : 0;
                if (ship.x + xoff === x && ship.y + yoff === y) {
                    // calculate offset to pass to ship.hit() based on orientation
                    const off = (ship.orientation === ShipOrientation.HORIZONTAL) ? xoff : yoff;
                    if (!ship.isHit(off)) {
                        ship.takeHit(off);
                        this._playerBoard.updateBoard(this._playerShips);
                        return true;
                    }
                    else
                        return false;
                }
            }
        }
        // should not be reachable
        return false;
    }
    // check if there's an cell occupied by a ship that hasn't been hit
    allSunk() {
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            for (let j = 0; j < this.BOARD_SIZE; j++) {
                if (this._playerBoard.board[i][j].occupiedBy && !this._playerBoard.board[i][j].isHit) {
                    return false;
                }
            }
        }
        return true;
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