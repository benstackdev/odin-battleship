import { GameBoard, BoardState } from "../modules/gameboard.js";
import { Ship, ShipObject } from "../modules/ship.js";
test("test board height", () => {
    const testBoard = new GameBoard();
    const row = Array(10);
    for (let i = 0; i < 10; i++)
        row[i] = BoardState.EMPTY;
    expect(testBoard.board).toEqual(Array.of(row, row, row, row, row, row, row, row, row, row));
});
test("test creation of length 2 ship at 0, 0", () => {
    const testBoard = new GameBoard();
    testBoard.createShip(2, 0, 0);
    expect(testBoard.board[0][0]).toEqual(BoardState.SHIP_ALIVE);
    expect(testBoard.board[1][0]).toEqual(BoardState.SHIP_ALIVE);
    expect(testBoard.ships.length).toEqual(1);
    // check single ship in list is a Ship object
    expect(testBoard.ships[0]).toBeInstanceOf(Ship);
});
// note: add test case where ship coords are invalid
//# sourceMappingURL=gameboard.test.js.map