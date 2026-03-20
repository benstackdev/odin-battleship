import { HumanPlayer, ComputerPlayer } from "./player.js";
import { ShipOrientation } from "./ship.js";

export enum GameState {
  SETUP = 1,
  PLAYING = 2,
  END = 3
}

/* Game state manager */
export class Game {
  shipSelectDiv: HTMLDivElement | null = document.querySelector(".ship-select");

  private _humanPlayer: HumanPlayer;
  private _computerPlayer: ComputerPlayer;

  private _gameState: GameState;

  constructor() {
    this._humanPlayer = new HumanPlayer();
    this._computerPlayer = new ComputerPlayer();
    this._gameState = GameState.SETUP;

    this.setupGameInit();
  }

  setupGameInit() {
    const ship1 = this._humanPlayer.createShip(3, undefined, undefined, ShipOrientation.HORIZONTAL);
    console.log(`${ship1.x}, ${ship1.y}`);
  }
}
