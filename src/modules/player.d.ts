import { Ship, ShipOrientation, type ShipLength } from "./ship.js";
import { GameBoard } from "./gameboard.js";
import type { Coordinate } from "../types/battleship_types.js";
declare class Player {
    readonly BOARD_SIZE = 10;
    private _playerBoard;
    private _playerShips;
    constructor(id: number);
    get playerBoard(): GameBoard;
    get playerShips(): Ship[];
    createShip(len: ShipLength, x: Coordinate | undefined, y: Coordinate | undefined, orientation: ShipOrientation): Ship;
    transformShip(ship: Ship, newx: Coordinate, newy: Coordinate, flip?: boolean): boolean;
    sendAttack(opponent: Player, x: Coordinate, y: Coordinate): boolean;
    receiveAttack(x: Coordinate, y: Coordinate): boolean;
    allSunk(): boolean;
    initPlayerShips(): void;
    randomizeShipLocations(): void;
    resetPlayer(): void;
}
declare class HumanPlayer extends Player {
    private _shipMoving;
    canMoveShips: boolean;
    constructor();
    initShipMovementEvents(): void;
    private _updateMovingShipPosition;
}
declare class ComputerPlayer extends Player {
    private _availableCells;
    private _shipHit;
    private _shipHitAdjacent;
    private _shipHitOrientation;
    constructor();
    findAttack(): [Coordinate, Coordinate];
    addToShipHit(pos: [Coordinate, Coordinate]): void;
    private _getCoordinates;
    private _getRandomGlobalPosition;
    private _getRandomAdjacentPosition;
    private _getRandomDirectedPosition;
}
export { Player, HumanPlayer, ComputerPlayer };
//# sourceMappingURL=player.d.ts.map