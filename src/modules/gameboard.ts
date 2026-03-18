import type { Coordinate, GameBoardTable } from "../types/battleship_types.js";
import { Ship, ShipOrientation, type ShipLength } from "./ship.js";
import { GameCell } from "./gamecell.js";

export class GameBoard {
  private readonly BOARD_SIZE = 10;
  private _board: GameBoardTable = [];
  private _ships: Ship[] = [];

  constructor() {
    for (let i = 0; i < this.BOARD_SIZE; i++) {
      const col: GameCell[] = [];
      for (let j = 0; j < this.BOARD_SIZE; j++) {
        col[j] = new GameCell();
      }
      this._board.push(col);
    }
  }

  get board() { return this._board; }
  get ships(): Ship[] { return this._ships; }

  createShip(len: ShipLength, x: Coordinate = 0, y: Coordinate = 0, 
    orientation: ShipOrientation = ShipOrientation.HORIZONTAL): Ship {
    const newShip = new Ship(len, x, y, orientation);
    if (this.validShipPosition(newShip)) {
      this._ships.push(newShip);
      this.updateBoard();
    }
    return newShip;
  }

  rotateShip(x: Coordinate, y: Coordinate): boolean {
    // find the ship at the x, y
    for (const ship of this._ships) {
      if (ship.x === x && ship.y === y) {
        const flipped = (ship.orientation === ShipOrientation.HORIZONTAL) ? ShipOrientation.VERTICAL : ShipOrientation.HORIZONTAL;

        if (this.validShipPosition(ship, flipped)) {
          ship.rotate();
          this.updateBoard(); 
          return true;
        }
        // if it isn't valid, return false
        return false;
      }
    }
    return false; // default if no ship is at given x, y
  }

  // optionally pass in second argument to check ship with specific orientation,
  // otherwise check ship at its current orientation
  validShipPosition(ship: Ship, orientation?: ShipOrientation): boolean {
    // skip base coordinate (self) if checking for valid rotation
    const checkOrientation = (orientation !== undefined) ? orientation : ship.orientation;

    for (let i = 0; i < ship.length; i++) {
      const xoff = (checkOrientation === ShipOrientation.HORIZONTAL) ? i : 0;
      const yoff = (checkOrientation === ShipOrientation.VERTICAL) ? i : 0;
      // check that ship is: 
      // a) in bounds
      if (ship.x + xoff <= 9 && ship.x + xoff >= 0 && 
          ship.y + yoff <= 9 && ship.y + yoff >= 0) {
          if (!this.isBufferAroundShip(ship, ship.x + xoff as Coordinate, ship.y + yoff as Coordinate)) {
            return false;
          }
      } else return false;
    }

    return true;
  }

  private isBufferAroundShip(ship: Ship, x: Coordinate, y: Coordinate) {
    // - not overlapping other existing ships (when i = 0 and j = 0 below)
    // - has one square buffer all around itself
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const xoffAdj = x + i;
        const yoffAdj = y + j;
        // check bounds of xoffAdj and yoffAdj first
        if (xoffAdj <= 9 && xoffAdj >= 0 && yoffAdj <= 9 && yoffAdj >= 0) {
          // if board is occupied by a ship other than the one being validated, return false
          // console.log(`${xoffAdj}, ${yoffAdj} ${JSON.stringify(this._board[xoffAdj][yoffAdj].occupiedBy?.length)}`);
          if (this._board[xoffAdj][yoffAdj].occupiedBy !== undefined && 
              this._board[xoffAdj][yoffAdj].occupiedBy !== ship) {
            console.log(`found conflict at: ${xoffAdj}, ${yoffAdj}`);
            return false;
          }
        }
      }
    }
    
    return true;
  } 

  updateBoard() {
    // reset board first before replacing ships
    for (let i = 0; i < this.BOARD_SIZE; i++) {
      for (let j = 0; j < this.BOARD_SIZE; j++) {
        this._board[i][j].occupiedBy = undefined;
      }
    }

    // Iterate through ships and place them on board according to their orientation
    for (const ship of this._ships) {
      for (let i = 0; i < ship.length; i++) {
        const xoff = (ship.orientation === ShipOrientation.HORIZONTAL) ? i : 0;
        const yoff = (ship.orientation === ShipOrientation.VERTICAL) ? i : 0;
        this._board[ship.x + xoff][ship.y + yoff].occupiedBy = ship;
      }
    }
    // console.log(this._board);
  }

  // return value indicates successful hit or not
  receiveAttack(x: Coordinate, y: Coordinate): boolean {
    // early return if already hit
    if (this._board[x][y].isHit) return false;
    this._board[x][y].isHit = true;

    // apply hit to the hit ship object itself
    for (const ship of this._ships) {
      for (let i = 0; i < ship.length; i++) {
        const xoff = (ship.orientation === ShipOrientation.HORIZONTAL) ? i : 0;
        const yoff = (ship.orientation === ShipOrientation.VERTICAL) ? i : 0;
        if (ship.x + xoff === x && ship.y + yoff === y) {
          // calculate offset to pass to ship.hit() based on orientation
          const off = (ship.orientation === ShipOrientation.HORIZONTAL) ? xoff : yoff;
          ship.hit(off);
          return true;
        }
      }
    }
    // should not be reachable
    return false;
  }

  // check if there's an cell occupied by a ship that hasn't been hit
  allSunk(): boolean {
    for (let i = 0; i < this.BOARD_SIZE; i++) {
      for (let j = 0; j < this.BOARD_SIZE; j++) {
        if (this._board[i][j].occupiedBy && !this._board[i]![j]!.isHit) return false;
      }
    }
    return true;
  }
}