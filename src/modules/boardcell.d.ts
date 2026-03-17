import type { Ship } from "./ship.js";
export interface BoardCellInterface {
    get occupiedBy(): Ship | undefined;
    get isHit(): boolean;
    set occupiedBy(occupy: Ship | undefined);
    set isHit(hit: boolean);
}
export declare class BoardCell implements BoardCellInterface {
    private _occupiedBy;
    private _isHit;
    constructor(ship?: Ship);
    get occupiedBy(): Ship | undefined;
    get isHit(): boolean;
    set occupiedBy(occupy: Ship | undefined);
    set isHit(hit: boolean);
}
//# sourceMappingURL=boardcell.d.ts.map