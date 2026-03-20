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
    this._humanGameBoardDisplay.updateDisplay();
  }
}