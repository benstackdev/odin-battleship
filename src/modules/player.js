import { Ship, ShipOrientation } from "./ship.js";
import { GameBoard } from "./gameboard.js";
import { PlayerID } from "./game.js";
class Player {
    BOARD_SIZE = 10;
    _playerBoard;
    _playerShips;
    constructor(id) {
        this._playerBoard = new GameBoard(id);
        this._playerShips = [];
    }
    get playerBoard() { return this._playerBoard; }
    get playerShips() { return this._playerShips; }
    createShip(len, x, y, orientation) {
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
        if (this._playerBoard.board[x][y].isHit === false) {
            this._playerBoard.board[x][y].isHit = true;
            this._playerBoard.updateBoard(this._playerShips);
        }
        else {
            this._playerBoard.updateBoard(this._playerShips);
            return false;
        }
        // iterate through ships, find location, and hit ship if not already
        for (const ship of this._playerShips) {
            if (ship.x === undefined || ship.y === undefined)
                continue;
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
                    this._playerBoard.updateBoard(this._playerShips);
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
    initPlayerShips() {
        // one length 4 ship
        this.createShip(4, undefined, undefined, ShipOrientation.HORIZONTAL);
        // two length 3 ships
        this.createShip(3, undefined, undefined, ShipOrientation.HORIZONTAL);
        this.createShip(3, undefined, undefined, ShipOrientation.HORIZONTAL);
        // three length 2 ships
        this.createShip(2, undefined, undefined, ShipOrientation.HORIZONTAL);
        this.createShip(2, undefined, undefined, ShipOrientation.HORIZONTAL);
        this.createShip(2, undefined, undefined, ShipOrientation.HORIZONTAL);
        // four length 1 ships
        this.createShip(1, undefined, undefined, ShipOrientation.HORIZONTAL);
        this.createShip(1, undefined, undefined, ShipOrientation.HORIZONTAL);
        this.createShip(1, undefined, undefined, ShipOrientation.HORIZONTAL);
        this.createShip(1, undefined, undefined, ShipOrientation.HORIZONTAL);
        this.randomizeShipLocations();
    }
    randomizeShipLocations() {
        // reset all ship locations
        for (const ship of this._playerShips) {
            ship.x = undefined;
            ship.y = undefined;
        }
        // iterate through ships, pick random location until valid then place
        for (const ship of this._playerShips) {
            let randX = Math.floor(Math.random() * 10);
            let randY = Math.floor(Math.random() * 10);
            let randFlip = (Math.random() > 0.5) ? true : false;
            // select new positions/orientations until valid
            while (!this.transformShip(ship, randX, randY, randFlip)) {
                randX = Math.floor(Math.random() * 10);
                randY = Math.floor(Math.random() * 10);
                randFlip = (Math.random() > 0.5) ? true : false;
            }
        }
    }
    resetPlayer() {
        this._playerBoard.resetBoard();
        this.randomizeShipLocations();
        this._playerBoard.updateBoard(this._playerShips);
    }
}
class HumanPlayer extends Player {
    _shipMoving;
    canMoveShips = true;
    constructor() {
        super(PlayerID.HUMAN);
        this.initShipMovementEvents();
    }
    initShipMovementEvents() {
        const board = this.playerBoard.board;
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            for (let j = 0; j < this.BOARD_SIZE; j++) {
                const cellDiv = document.querySelector(`.x${PlayerID.HUMAN}-${i}.y${PlayerID.HUMAN}-${j}`);
                if (cellDiv === null)
                    continue;
                cellDiv.addEventListener("click", () => {
                    if (!this.canMoveShips)
                        return;
                    // get state of the cell on game board
                    if (this._shipMoving) {
                        // early return if ship position is invalid
                        if (!this._shipMoving.isValidPosition)
                            return;
                        // is defined and valid: stop moving this ship and place at location
                        this._shipMoving.isMoving = false;
                        this._shipMoving = undefined;
                    }
                    else {
                        const ship = board[i][j].occupiedBy;
                        // undefined: start moving
                        if (ship !== undefined) {
                            this._shipMoving = ship; // remember the ship being moved   
                            ship.isMoving = true;
                            this._updateMovingShipPosition(i, j);
                        }
                    }
                    this.playerBoard.updateBoard(this.playerShips, this._shipMoving);
                });
                cellDiv.addEventListener("mouseenter", () => {
                    if (!this.canMoveShips)
                        return;
                    if (this._shipMoving !== undefined) {
                        this._updateMovingShipPosition(i, j);
                    }
                });
            }
        }
        document.addEventListener("keypress", (e) => {
            if (!this.canMoveShips)
                return;
            if (this._shipMoving !== undefined && (e.code === "Space" || e.code === "KeyR")) {
                // convoluted check to make sure ship can rotate based on bounds
                const newBound = this._shipMoving.orientation === ShipOrientation.HORIZONTAL ?
                    this._shipMoving.y + this._shipMoving.length - 1 : this._shipMoving.x + this._shipMoving.length - 1;
                if (newBound <= 9) {
                    this._shipMoving.flip();
                    this._shipMoving.isValidPosition = this.playerBoard.isValidShipPosition(this._shipMoving);
                    this.playerBoard.updateBoard(this.playerShips, this._shipMoving);
                }
            }
        });
    }
    _updateMovingShipPosition(x, y) {
        if (this._shipMoving !== undefined) {
            // there currently is a ship being moved
            // still ensure that any x,y is within the bounds of the board
            const maxBound = this._shipMoving.orientation === ShipOrientation.HORIZONTAL ?
                x + this._shipMoving.length - 1 : y + this._shipMoving.length - 1;
            if (x < 0 || x > 9 || y < 0 || y > 9 || maxBound > 9)
                return;
            this._shipMoving.x = x;
            this._shipMoving.y = y;
            this._shipMoving.isValidPosition = this.playerBoard.isValidShipPosition(this._shipMoving);
            this.playerBoard.updateBoard(this.playerShips, this._shipMoving);
        }
    }
}
// * Maybe refactor ComputerPlayer to use State Machine
class ComputerPlayer extends Player {
    // key: [Coordinate, Coordinate], value: boolean
    _availableCells = new Set();
    _shipHit = [];
    _shipHitAdjacent = new Set();
    _shipHitOrientation;
    constructor() {
        super(PlayerID.COMPUTER);
        // all cells available to hit at start
        for (let i = 0; i < this.BOARD_SIZE; i++) {
            for (let j = 0; j < this.BOARD_SIZE; j++) {
                this._availableCells.add(i * this.BOARD_SIZE + j);
            }
        }
    }
    findAttack() {
        let attackPosition;
        if (this._shipHit.length > 0) {
            // know we've hit a ship
            if (this._shipHitOrientation !== undefined) {
                // know we've hit a ship AND what the orientation of that ship is
                attackPosition = this._getRandomDirectedPosition();
            }
            else {
                // don't know the orientation, so just guess some adjacent position
                attackPosition = this._getRandomAdjacentPosition();
            }
            if (attackPosition !== undefined) {
                this._availableCells.delete(attackPosition[0] * this.BOARD_SIZE + attackPosition[1]);
                return attackPosition;
            }
            // if we make it past here, attackPosition was undefined, so clear out shipHit and shipHitOrientation
            this._shipHit = [];
            this._shipHitAdjacent.clear();
            this._shipHitOrientation = undefined;
        }
        // find random spot to hit
        attackPosition = this._getRandomGlobalPosition();
        this._availableCells.delete(attackPosition[0] * this.BOARD_SIZE + attackPosition[1]);
        return attackPosition;
    }
    addToShipHit(pos) {
        // get orientation if we can
        if (this._shipHit.length === 1 && this._shipHitOrientation === undefined) {
            // if x of the old hit ship position matches the new position, the orientation of the ship must be vertical, otherwise horizontal
            if (pos[0] === this._shipHit[0][0])
                this._shipHitOrientation = ShipOrientation.VERTICAL;
            else
                this._shipHitOrientation = ShipOrientation.HORIZONTAL;
        }
        this._shipHit.push(pos);
    }
    // get two coordinates from a single numbered position
    _getCoordinates(pos) {
        const x = Math.floor(pos / this.BOARD_SIZE);
        const y = pos % this.BOARD_SIZE;
        return [x, y];
    }
    _getRandomGlobalPosition() {
        const position = Array.from(this._availableCells)[Math.floor(Math.random() * this._availableCells.size)];
        return this._getCoordinates(position);
    }
    // TODO: Make another helper function for converting coordinates to cell position (as x * 10 + y)
    _getRandomAdjacentPosition() {
        // populate with adjacent spots from this._shipHit[0]
        if (this._shipHitAdjacent.size === 0) {
            const shipHitX = this._shipHit[0][0];
            const shipHitY = this._shipHit[0][1];
            const up = [shipHitX, shipHitY - 1];
            const down = [shipHitX, shipHitY + 1];
            const left = [shipHitX - 1, shipHitY];
            const right = [shipHitX + 1, shipHitY];
            if (this._availableCells.has(up[0] * this.BOARD_SIZE + up[1]) && up[1] >= 0)
                this._shipHitAdjacent.add(up[0] * this.BOARD_SIZE + up[1]);
            if (this._availableCells.has(down[0] * this.BOARD_SIZE + down[1]) && down[1] <= 9)
                this._shipHitAdjacent.add(down[0] * this.BOARD_SIZE + down[1]);
            if (this._availableCells.has(left[0] * this.BOARD_SIZE + left[1]) && left[0] >= 0)
                this._shipHitAdjacent.add(left[0] * this.BOARD_SIZE + left[1]);
            if (this._availableCells.has(right[0] * this.BOARD_SIZE + right[1]) && right[0] <= 9)
                this._shipHitAdjacent.add(right[0] * this.BOARD_SIZE + right[1]);
        }
        // empty return if all adjacent positions have been hit
        if (this._shipHitAdjacent.size === 0)
            return;
        // get random adjacent position
        const randomAdjacentPosition = Array.from(this._shipHitAdjacent)[Math.floor(Math.random() * this._shipHitAdjacent.size)];
        this._shipHitAdjacent.delete(randomAdjacentPosition);
        return this._getCoordinates(randomAdjacentPosition);
    }
    _getRandomDirectedPosition() {
        if (this._shipHitOrientation === ShipOrientation.HORIZONTAL) {
            // horizontal
            // find min and max x positions to guess from
            const shipHitY = this._shipHit[0][1]; // since horizontal, the y is the same
            let xMin = this._shipHit[0][0];
            let xMax = this._shipHit[0][0];
            for (let i = 0; i < this._shipHit.length; i++) {
                if (this._shipHit[i][0] < xMin)
                    xMin = this._shipHit[i][0];
                if (this._shipHit[i][0] > xMax)
                    xMax = this._shipHit[i][0];
            }
            // try guessing to the left first, then the right
            if (xMin > 0 && this._availableCells.has((xMin - 1) * this.BOARD_SIZE + shipHitY))
                return [xMin - 1, shipHitY];
            else if (xMax < 9 && this._availableCells.has((xMax + 1) * this.BOARD_SIZE + shipHitY))
                return [xMax + 1, shipHitY];
        }
        else {
            // vertical
            // find min and max y positions to guess from
            const shipHitX = this._shipHit[0][0]; // since vertical, the x is the same
            let yMin = this._shipHit[0][1];
            let yMax = this._shipHit[0][1];
            for (let i = 0; i < this._shipHit.length; i++) {
                if (this._shipHit[i][1] < yMin)
                    yMin = this._shipHit[i][1];
                if (this._shipHit[i][1] > yMax)
                    yMax = this._shipHit[i][1];
            }
            // try guessing to the left first, then the right
            if (yMin > 0 && this._availableCells.has(shipHitX * this.BOARD_SIZE + (yMin - 1)))
                return [shipHitX, yMin - 1];
            else if (yMax < 9 && this._availableCells.has(shipHitX * this.BOARD_SIZE + (yMax + 1)))
                return [shipHitX, yMax + 1];
        }
        return;
    }
}
export { Player, HumanPlayer, ComputerPlayer };
//# sourceMappingURL=player.js.map