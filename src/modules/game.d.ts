import type { Coordinate } from "../types/battleship_types.js";
export declare enum GameState {
    SETUP = 1,
    PLAYING = 2,
    END = 3
}
export declare enum PlayerID {
    HUMAN = 1,
    COMPUTER = 2
}
export declare class Game {
    readonly BOARD_SIZE = 10;
    shipSelectDiv: HTMLDivElement | null;
    startGameButton: HTMLButtonElement | null;
    currentTurnDiv: HTMLDivElement | null;
    private _humanPlayer;
    private _computerPlayer;
    private _currentTurn;
    private _computerTurnDelay;
    private _gameState;
    constructor();
    setupGameInit(): void;
    humanTurnInit(): void;
    computerTurn(): Promise<void>;
    computerFindAttack(): [Coordinate, Coordinate];
    toggleTurn(): void;
}
//# sourceMappingURL=game.d.ts.map