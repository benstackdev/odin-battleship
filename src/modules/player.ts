import { Ship, ShipOrientation, type ShipLength } from "./ship.js";
import { GameBoard } from "./gameboard.js";
import type { Coordinate } from "../types/battleship_types.js";

class Player {
  readonly BOARD_SIZE = 10;
  private _playerBoard: GameBoard;
  private _playerShips: Ship[];

  constructor() {
    this._playerBoard = new GameBoard();
    this._playerShips = [];
  }

  get playerBoard() { return this._playerBoard; }
  get playerShips() { return this._playerShips; }

  createShip(len: ShipLength, x: Coordinate | undefined, y: Coordinate | undefined, orientation: ShipOrientation) {
    const newShip = new Ship(len, x, y, orientation);
    if (this._playerBoard.isValidShipPosition(newShip)) {
      this._playerShips.push(newShip);
      this._playerBoard.updateBoard(this._playerShips);
    }
    return newShip;
  }

  transformShip(ship: Ship, newx: Coordinate, newy: Coordinate, flip: boolean = false): boolean {
    if (this._playerShips.includes(ship)) {
      const oldx = ship.x;
      const oldy = ship.y;

      ship.x = newx;
      ship.y = newy;
      if (flip) ship.flip();
      
      if (this._playerBoard.isValidShipPosition(ship)) {
        this._playerBoard.updateBoard(this._playerShips);
        return true;
      } else {
        ship.x = oldx;
        ship.y = oldy;
        if (flip) ship.flip();
        return false; 
      }
    } else return false;
  }

  sendAttack(opponent: Player, x: Coordinate, y: Coordinate): boolean {
    return opponent.receiveAttack(x, y); 
  }

  receiveAttack(x: Coordinate, y: Coordinate): boolean {
    // iterate through ships, find location, and hit ship if not already
    for (const ship of this._playerShips) {
      if (ship.x === undefined || ship.y === undefined) continue;
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
          } else return false;
        }
      }
    }
    // should not be reachable
    return false;
  }

    // check if there's an cell occupied by a ship that hasn't been hit
  allSunk(): boolean {
    for (let i = 0 as Coordinate; i < this.BOARD_SIZE; i++) {
      for (let j = 0 as Coordinate; j < this.BOARD_SIZE; j++) {
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

export { Player, HumanPlayer, ComputerPlayer }