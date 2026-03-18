import { GameBoard } from "./gameboard.js";
export declare class GameBoardDisplay {
    readonly gameDiv: HTMLDivElement | null;
    private readonly _BOARD_SIZE;
    private _gameBoard;
    private _gameBoardDiv;
    constructor(board: GameBoard);
    initDisplay(): void;
    updateDisplay(): void;
}
//# sourceMappingURL=gameboard_display.d.ts.map