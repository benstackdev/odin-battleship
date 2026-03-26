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
    gameSetupElements: NodeListOf<HTMLElement>;
    gamePlayingElements: NodeListOf<HTMLElement>;
    gameEndElements: NodeListOf<HTMLElement>;
    randomizeBoardButton: HTMLButtonElement;
    startGameButton: HTMLButtonElement;
    newGameButton: HTMLButtonElement;
    turnDiv: HTMLDivElement;
    currentTurnDiv: HTMLDivElement;
    winnerDiv: HTMLSpanElement;
    private _humanPlayer;
    private _computerPlayer;
    private _currentTurn;
    private _computerTurnDelay;
    private _gameState;
    constructor();
    private _updateElementVisibility;
    setupGameInit(): void;
    humanTurnInit(): void;
    computerTurn(): Promise<void>;
    toggleTurn(): void;
    private _gameOver;
}
//# sourceMappingURL=game.d.ts.map