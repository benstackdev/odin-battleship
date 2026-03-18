import type { Ship } from "./ship.js";

export class ShipDisplay {
  private _ship: Ship;

  constructor(ship: Ship) {
    this._ship = ship;
  }
}