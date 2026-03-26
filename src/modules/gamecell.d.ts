import type { Ship } from "./ship.js";
export interface GameCellInterface {
    get occupiedBy(): Ship | undefined;
    get isHit(): boolean;
    set occupiedBy(occupy: Ship | undefined);
    set isHit(hit: boolean);
}
export declare class GameCell implements GameCellInterface {
    private _occupiedBy;
    private _isHit;
    private _isFixed;
    private _isValid;
    constructor(ship?: Ship);
    get occupiedBy(): Ship | undefined;
    get isHit(): boolean;
    get isFixed(): boolean;
    get isValid(): boolean;
    set occupiedBy(occupy: Ship | undefined);
    set isHit(hit: boolean);
    set isFixed(fixed: boolean);
    set isValid(valid: boolean);
}
//# sourceMappingURL=gamecell.d.ts.map