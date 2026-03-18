import type { Coordinate } from "../types/battleship_types.js";
export type ShipLength = 1 | 2 | 3 | 4;
export declare enum ShipOrientation {
    HORIZONTAL = 0,
    VERTICAL = 1
}
export interface ShipObject {
    hit(off: number): void;
    isDamaged(off: number): boolean | undefined;
    rotate(): void;
    get hits(): number;
    get length(): ShipLength;
    get isSunk(): boolean;
    get x(): Coordinate;
    get y(): Coordinate;
    get orientation(): ShipOrientation;
    get damage(): boolean[];
}
export declare class Ship implements ShipObject {
    private _x;
    private _y;
    private _orientation;
    private _length;
    private _hits;
    private _isSunk;
    private _damage;
    constructor(len: ShipLength, x?: Coordinate, y?: Coordinate, orientation?: ShipOrientation);
    get hits(): number;
    get length(): ShipLength;
    get isSunk(): boolean;
    get x(): Coordinate;
    get y(): Coordinate;
    get orientation(): ShipOrientation;
    get damage(): boolean[];
    hit(off: number): void;
    isDamaged(off: number): boolean | undefined;
    rotate(): void;
}
//# sourceMappingURL=ship.d.ts.map