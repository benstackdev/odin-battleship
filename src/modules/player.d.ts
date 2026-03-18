import { type ShipLength } from "./ship.js";
import { GameBoard } from "./gameboard.js";
import type { Coordinate } from "../types/battleship_types.js";
declare class Player {
    private _playerBoard;
    constructor(board: GameBoard);
    get playerBoard(): GameBoard;
    placeShip(len: ShipLength, x?: Coordinate, y?: Coordinate): void;
    attack(opponent: Player, x: Coordinate, y: Coordinate): boolean;
}
declare class HumanPlayer extends Player {
    constructor(board: GameBoard);
}
declare class ComputerPlayer extends Player {
    constructor(board: GameBoard);
}
export { Player, HumanPlayer, ComputerPlayer };
//# sourceMappingURL=player.d.ts.map