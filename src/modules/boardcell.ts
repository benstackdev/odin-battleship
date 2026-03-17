import type { Ship } from "./ship.js";

export interface BoardCellInterface {
  get occupiedBy(): Ship | undefined;
  get isHit(): boolean;
  set occupiedBy(occupy: Ship | undefined);
  set isHit(hit: boolean);
}

export class BoardCell implements BoardCellInterface {
  private _occupiedBy: Ship | undefined; 
  private _isHit: boolean;

  constructor(ship?: Ship) {
    this._occupiedBy = ship;
    this._isHit = false;
  }

  get occupiedBy() { return this._occupiedBy; }
  get isHit() { return this._isHit; }

  set occupiedBy(occupy: Ship | undefined) { this._occupiedBy = occupy; }
  set isHit(hit: boolean) { this._isHit = hit; } 
}