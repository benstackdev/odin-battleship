import type { Coordinate, GameBoardTable } from "../types/battleship_types.js";
import { Ship, ShipOrientation } from "./ship.js";
import { GameCell } from "./gamecell.js";
import { PlayerID } from "./game.js";

// TODO: reset board state on game restart
export class GameBoard {
  readonly gameDiv: HTMLDivElement | null = document.querySelector(".game");
  private _gameBoardDiv: HTMLDivElement = document.createElement("div");

  private readonly BOARD_SIZE = 10;
  private _board: GameBoardTable = [];

  private _id: number;

  constructor(id: number) {
    // gameboard internal state
    for (let i = 0; i < this.BOARD_SIZE; i++) {
      const col: GameCell[] = [];
      for (let j = 0; j < this.BOARD_SIZE; j++) {
        col[j] = new GameCell();
      }
      this._board.push(col);
    }

    this._id = id;
    this.initDisplay();
  }

  get board() { return this._board; }
  get id() { return this._id; }
  get gameBoardDiv() { return this._gameBoardDiv; }

  // optionally pass in second argument to check ship with specific orientation,
  // otherwise check ship at its current orientation
  
  // * Eventually refactor to add newX, newY as params?
  isValidShipPosition(ship: Ship, orientation?: ShipOrientation): boolean {
    if (ship.x === undefined || ship.y === undefined) return true;
    // skip base coordinate (self) if checking for valid rotation
    const checkOrientation = (orientation !== undefined) ? orientation : ship.orientation;
    for (let i = 0; i < ship.length; i++) {
      
      const xoff = (checkOrientation === ShipOrientation.HORIZONTAL) ?  i : 0;
      const yoff = (checkOrientation === ShipOrientation.VERTICAL) ? i : 0;
      // check that ship is: 
      // a) in bounds
      if (ship.x + xoff <= 9 && ship.x + xoff >= 0 &&
        ship.y + yoff <= 9 && ship.y + yoff >= 0) {
        if (!this._isBufferAroundShip(ship, ship.x + xoff as Coordinate, ship.y + yoff as Coordinate)) {
          return false;
        }
      } else return false;
    }

    return true;
  }

  private _isBufferAroundShip(ship: Ship, x: Coordinate, y: Coordinate) {
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
            return false;
          }
        }
      }
    }

    return true;
  }

  updateBoard(ships: Ship[]) {
    // reset board first before replacing ships
    for (let i = 0; i < this.BOARD_SIZE; i++) {
      for (let j = 0; j < this.BOARD_SIZE; j++) {
        this._board[i][j].occupiedBy = undefined;
        this._board[i][j].isFixed = true;
        this._board[i][j].isValid = true;
      }
    }

    // Iterate through ships and place them on board according to their orientation
    for (const ship of ships) {
      if (ship.x === undefined || ship.y === undefined) continue;
      for (let i = 0; i < ship.length; i++) {
        const xoff = (ship.orientation === ShipOrientation.HORIZONTAL) ? i : 0;
        const yoff = (ship.orientation === ShipOrientation.VERTICAL) ? i : 0;
        const shipX = ship.x + xoff;
        const shipY = ship.y + yoff;

        // don't occupy cell if ship is moving
        if (ship.isMoving) {
          this._board[shipX][shipY].occupiedBy = undefined;
          this._board[shipX][shipY].isValid = ship.isValidPosition;
        } else {
          this._board[shipX][shipY].occupiedBy = ship;
        }
        this._board[shipX][shipY].isFixed = !ship.isMoving;
      }
    }

    this.updateDisplay();
  }

  initDisplay() {
    this._gameBoardDiv.className = `game-board`;
    if (this.gameDiv !== null) this.gameDiv.appendChild(this._gameBoardDiv);

    for (let i = 0 as Coordinate; i < this.BOARD_SIZE; i++) {
      for (let j = 0 as Coordinate; j < this.BOARD_SIZE; j++) {
        // eventual refactor to use GameCellDisplay object
        const cell = document.createElement("div");
        cell.className = `game-board-cell x${this._id}-${j} y${this._id}-${i}`;

        // add x axis label
        if (i == 0) {
          const xAxisMarker = document.createElement("div");
          xAxisMarker.className = "x-axis-marker";
          xAxisMarker.textContent = `${"ABCDEFGHIJ".charAt(j)}`;
          cell.appendChild(xAxisMarker);
        }

        // add y axis label 
        if (j == 0) {
          const yAxisMarker = document.createElement("div");
          // add origin marker if at origin for special transform
          if (i === 0) yAxisMarker.className = "y-axis-marker origin";
          else yAxisMarker.className = "y-axis-marker";

          yAxisMarker.textContent = `${i + 1}`;
          cell.appendChild(yAxisMarker);
        }

        this._gameBoardDiv.appendChild(cell);
      }
    }

    const gameBoardLabelText = (this._id === PlayerID.HUMAN) ? "Your board" : "Computer's board";
    const gameBoardLabelDiv: HTMLDivElement = document.createElement("div");
    gameBoardLabelDiv.className = "game-board-label";
    gameBoardLabelDiv.textContent = gameBoardLabelText;
    
    this.gameDiv!.appendChild(gameBoardLabelDiv);

  }

  updateDisplay() {
    for (let i = 0; i < this.BOARD_SIZE; i++) {
      for (let j = 0; j < this.BOARD_SIZE; j++) {
        const cell = document.querySelector(`.x${this._id}-${i}.y${this._id}-${j}`);
        if (this._board[i][j].occupiedBy) {
          cell?.classList.add("ship");
          // add class to hide ships if the board is the computer's board
          if (this._id === PlayerID.COMPUTER) cell?.classList.add("computer");
        } else {
          if (cell?.classList.contains("ship")) cell?.classList.remove("ship");
        }
        
        if (this._board[i][j].isHit) cell?.classList.add("hit");

        if (this._board[i][j].isFixed === false) {
          cell?.classList.add("not-fixed");
          if (!this._board[i][j].isValid) cell?.classList.add("invalid");
        }
        else {
          cell?.classList.remove("not-fixed");
          cell?.classList.remove("invalid");
        }
      }
    }
  }
}