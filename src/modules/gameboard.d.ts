import type { GameBoardTable } from "../types/battleship_types.js";
import { Ship, ShipOrientation } from "./ship.js";
export declare class GameBoard {
    readonly gameDiv: HTMLDivElement | null;
    private _gameBoardDiv;
    private readonly BOARD_SIZE;
    private _board;
    private _id;
    constructor(id: number);
    get board(): GameBoardTable;
    get id(): number;
    get gameBoardDiv(): HTMLDivElement;
    isValidShipPosition(ship: Ship, orientation?: ShipOrientation): boolean;
    private isBufferAroundShip;
    updateBoard(ships: Ship[]): void;
    initDisplay(): void;
    updateDisplay(): void;
}
//# sourceMappingURL=gameboard.d.ts.map