import type { Coordinate } from "../types/battleship_types.js";

export type ShipLength = 1 | 2 | 3 | 4;
export enum ShipOrientation {
  HORIZONTAL = 0,
  VERTICAL = 1,
}

// ? Maybe refactor x, y, isMoving to a Location class?

export interface ShipObject {
  takeHit(off: number): void;
  isHit(off: number): boolean | undefined;
  flip(): void;
  get hits(): number;
  get length(): ShipLength;
  get isSunk(): boolean;
  get x(): Coordinate | undefined;
  get y(): Coordinate | undefined;
  get orientation(): ShipOrientation;
  get shipSegmentHit(): boolean[];
}

export class Ship implements ShipObject {
  private _x: Coordinate | undefined;
  private _y: Coordinate | undefined;
  private _orientation: ShipOrientation;

  private _length: ShipLength;
  private _hits: number = 0;
  private _isSunk: boolean = false;
  private _isMoving: boolean = false;
  private _isValidPosition: boolean = true;
  private _shipSegmentHit: boolean[];

  constructor(len: ShipLength, x: Coordinate | undefined, y: Coordinate | undefined, orientation: ShipOrientation = ShipOrientation.HORIZONTAL) {
    this._x = x;
    this._y = y;
    this._length = len;
    this._shipSegmentHit = Array(len).fill(false);
    this._orientation = orientation;
  }

  get hits() { return this._hits }
  get length() { return this._length; }
  get isSunk() { return this._isSunk }
  get x() { return this._x; }
  get y() { return this._y; }
  get orientation() { return this._orientation; }
  get shipSegmentHit() { return this._shipSegmentHit; }
  get isMoving() { return this._isMoving; }
  get isValidPosition() { return this._isValidPosition; }

  set x(newx: Coordinate | undefined) { this._x = newx; }
  set y(newy: Coordinate | undefined) { this._y = newy; }
  set isMoving(moving: boolean) { this._isMoving = moving; }
  set isValidPosition(isValid: boolean) { this._isValidPosition = isValid; }

  takeHit(off: number) {
    if (this.isHit(off) === undefined || 
        this.isHit(off) === true || this._isSunk) return;

    this._shipSegmentHit[off] = true;
    if (this._hits < this._length) this._hits++;
    if (this._hits === this._length) this._isSunk = true;
  }
  
  isHit(off: number): boolean | undefined {
    if (off < 0 || off > this._length - 1) return undefined;
    return this._shipSegmentHit[off];
  }

  flip() {
    this._orientation = (this._orientation === ShipOrientation.VERTICAL) 
                        ? ShipOrientation.HORIZONTAL : ShipOrientation.VERTICAL;
  }
}