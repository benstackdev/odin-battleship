import type { Coordinate, GameBoardTable } from "../types/battleship_types.js";
import { Ship, ShipOrientation, type ShipLength } from "./ship.js";
export declare class GameBoard {
    private readonly BOARD_SIZE;
    private _board;
    private _ships;
    constructor();
    get board(): GameBoardTable;
    get ships(): Ship[];
    createShip(len: ShipLength, x?: Coordinate, y?: Coordinate, orientation?: ShipOrientation): Ship;
    rotateShip(x: Coordinate, y: Coordinate): boolean;
    validShipPosition(ship: Ship, orientation?: ShipOrientation): boolean;
    private isBufferAroundShip;
    updateBoard(): void;
    receiveAttack(x: Coordinate, y: Coordinate): boolean;
    allSunk(): boolean;
}
//# sourceMappingURL=gameboard.d.ts.map