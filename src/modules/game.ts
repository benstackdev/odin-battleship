import { GameBoard } from "./gameboard.js";
import { GameBoardDisplay } from "./gameboard_display.js";
import { HumanPlayer, ComputerPlayer } from "./player.js";
import { ShipOrientation } from "./ship.js";

/* Game state manager internally; no DOM manipulation here */

export class Game {
  private _humanPlayer: HumanPlayer;
  private _computerPlayer: ComputerPlayer;
  private _humanGameBoard: GameBoard;
  private _humanGameBoardDisplay: GameBoardDisplay;
  private _computerGameBoard: GameBoard;
  private _computerGameBoardDisplay: GameBoardDisplay;

  constructor() {
    this._humanGameBoard = new GameBoard();
    this._computerGameBoard = new GameBoard();
    this._humanGameBoardDisplay = new GameBoardDisplay(this._humanGameBoard);
    this._computerGameBoardDisplay = new GameBoardDisplay(this._computerGameBoard);
    this._humanPlayer = new HumanPlayer(this._humanGameBoard);
    this._computerPlayer = new HumanPlayer(this._computerGameBoard);
  
    this.initGame();
  }

  initGame() {
    this._humanGameBoard.createShip(4, 3, 0, ShipOrientation.VERTICAL);
    this._humanGameBoard.createShip(3, 5, 1, ShipOrientation.VERTICAL);
    this._humanGameBoard.createShip(3, 8, 3, ShipOrientation.VERTICAL);
    this._humanGameBoard.createShip(2, 0, 0, ShipOrientation.VERTICAL);
    this._humanGameBoard.createShip(2, 4, 7, ShipOrientation.VERTICAL);
    this._humanGameBoard.createShip(2, 7, 7, ShipOrientation.HORIZONTAL);
    this._humanGameBoard.createShip(1, 1, 5);
    this._humanGameBoard.createShip(1, 3, 5);
    this._humanGameBoard.createShip(1, 1, 8);
    this._humanGameBoard.createShip(1, 9, 9);
    this._humanGameBoardDisplay.updateDisplay();
  }
}