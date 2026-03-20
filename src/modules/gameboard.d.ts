import type { GameBoardTable } from "../types/battleship_types.js";
import { Ship, ShipOrientation } from "./ship.js";
export declare class GameBoard {
    readonly gameDiv: HTMLDivElement | null;
    private _gameBoardDiv;
    private readonly BOARD_SIZE;
    private _board;
    constructor();
    get board(): GameBoardTable;
    isValidShipPosition(ship: Ship, orientation?: ShipOrientation): boolean;
    private isBufferAroundShip;
    updateBoard(ships: Ship[]): void;
    initDisplay(): void;
    updateDisplay(): void;
}
//# sourceMappingURL=gameboard.d.ts.map