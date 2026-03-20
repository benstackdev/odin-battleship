export declare enum GameState {
    SETUP = 1,
    PLAYING = 2,
    END = 3
}
export declare class Game {
    shipSelectDiv: HTMLDivElement | null;
    private _humanPlayer;
    private _computerPlayer;
    private _gameState;
    constructor();
    setupGameInit(): void;
}
//# sourceMappingURL=game.d.ts.map