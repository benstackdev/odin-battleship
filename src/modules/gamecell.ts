import type { Ship } from "./ship.js";

export interface GameCellInterface {
  get occupiedBy(): Ship | undefined;
  get isHit(): boolean;
  set occupiedBy(occupy: Ship | undefined);
  set isHit(hit: boolean);
}

export class GameCell implements GameCellInterface {
  private _occupiedBy: Ship | undefined; 
  private _isHit: boolean;
  private _isFixed: boolean;
  private _isValid: boolean;

  constructor(ship?: Ship) {
    this._occupiedBy = ship;
    this._isHit = false;
    this._isFixed = true;
    this._isValid = true;
  }

  get occupiedBy() { return this._occupiedBy; }
  get isHit() { return this._isHit; }
  get isFixed() { return this._isFixed; }
  get isValid() { return this._isValid; }

  set occupiedBy(occupy: Ship | undefined) { this._occupiedBy = occupy; }
  set isHit(hit: boolean) { this._isHit = hit; } 
  set isFixed(fixed: boolean) { this._isFixed = fixed; } 
  set isValid(valid: boolean) { this._isValid = valid; }
}