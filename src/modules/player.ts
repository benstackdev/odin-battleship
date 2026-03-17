import { type ShipLength } from "./ship.js";
import { GameBoard } from "./gameboard.js";
import type { Coordinate } from "../types/battleship_types.js";

class Player {
  private _playerBoard: GameBoard;

  constructor() {
    this._playerBoard = new GameBoard();
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