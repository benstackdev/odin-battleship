import type { Coordinate } from "../types/battleship_types.js";
export type ShipLength = 1 | 2 | 3 | 4;
export declare enum ShipOrientation {
    HORIZONTAL = 0,
    VERTICAL = 1
}
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
export declare class Ship implements ShipObject {
    private _x;
    private _y;
    private _orientation;
    private _length;
    private _hits;
    private _isSunk;
    private _isMoving;
    private _isValidPosition;
    private _shipSegmentHit;
    constructor(len: ShipLength, x: Coordinate | undefined, y: Coordinate | undefined, orientation?: ShipOrientation);
    get hits(): number;
    get length(): ShipLength;
    get isSunk(): boolean;
    get x(): Coordinate | undefined;
    get y(): Coordinate | undefined;
    get orientation(): ShipOrientation;
    get shipSegmentHit(): boolean[];
    get isMoving(): boolean;
    get isValidPosition(): boolean;
    set x(newx: Coordinate | undefined);
    set y(newy: Coordinate | undefined);
    set isMoving(moving: boolean);
    set isValidPosition(isValid: boolean);
    takeHit(off: number): void;
    isHit(off: number): boolean | undefined;
    flip(): void;
}
//# sourceMappingURL=ship.d.ts.map