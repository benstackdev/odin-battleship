import { type ShipLength } from "./ship.js";
import { GameBoard } from "./gameboard.js";
import type { Coordinate } from "../types/battleship_types.js";

class Player {
  private _playerBoard: GameBoard;

  constructor(board: GameBoard) {
    this._playerBoard = board;
  }

  get playerBoard() { return this._playerBoard; }

  placeShip(len: ShipLength, x: Coordinate = 0, y: Coordinate = 0) {
    this._playerBoard.createShip(len, x, y);
  }

  attack(opponent: Player, x: Coordinate, y: Coordinate): boolean {
    return opponent.playerBoard.receiveAttack(x, y); 
  }
}

class HumanPlayer extends Player {
  constructor(board: GameBoard) {
    super(board);
  }
}

class ComputerPlayer extends Player {
  constructor(board: GameBoard) {
    super(board);
  }
}

export { Player, HumanPlayer, ComputerPlayer }