// TODO: update test set

import { GameBoard } from "../modules/gameboard.js";
import { BoardCell } from "../modules/gamecell.js";
import { Ship } from "../modules/ship.js";

test("test board height", () => {
  const testBoard = new GameBoard();
  const row = Array<BoardCell>(10);
  for (let i = 0; i < 10; i++) row[i] = new BoardCell();
  expect(testBoard.board).toEqual(Array.of(row, row, row, row, row, row, row, row, row, row));
});

test("test creation of length 2 ship at 0, 0", () => {
  const testBoard = new GameBoard();
  const ship1 = testBoard.createShip(2, 0, 0);
  expect(testBoard.board[0][0].occupiedBy).toEqual(ship1);
  expect(testBoard.board[0][0].occupiedBy).toEqual(ship1);
  expect(testBoard.ships.length).toEqual(1);
  // check single ship in list is a Ship object
  expect(ship1).toBeInstanceOf(Ship);
});

test("test creation of length 3 ship at invalid coordinates", () => {
  const testBoard = new GameBoard();
  testBoard.createShip(3, 8, 0);
  expect(testBoard.board[8][0].occupiedBy).toEqual(undefined);
  expect(testBoard.board[9][0].occupiedBy).toEqual(undefined);
  expect(testBoard.ships.length).toEqual(0);
  // check single ship in list is a Ship object
});

test("cannot create overlapping ships", () => {
  const testBoard = new GameBoard();
  const ship1 = testBoard.createShip(3, 0, 0);
  testBoard.createShip(2, 1, 0);
  expect(testBoard.board[0][0].occupiedBy).toEqual(ship1);
  expect(testBoard.board[1][0].occupiedBy).toEqual(ship1);
  expect(testBoard.board[2][0].occupiedBy).toEqual(ship1);
  expect(testBoard.ships.length).toEqual(1);
  // check single ship in list is a Ship object
  expect(ship1).toBeInstanceOf(Ship);
});

test("attack size 2 ship in one spot", () => {
  const testBoard = new GameBoard();
  const ship1 = testBoard.createShip(2, 0, 0);
  testBoard.receiveAttack(1, 0);
  expect(testBoard.board[0][0].occupiedBy).toEqual(ship1);
  expect(testBoard.board[1][0].isHit).toEqual(true);
  expect(ship1!.hits).toBe(1);
});

test("miss attack on size 2 ship", () => {
  const testBoard = new GameBoard();
  const ship1 = testBoard.createShip(2, 0, 0);
  testBoard.receiveAttack(2, 1);
  expect(testBoard.board[0][0].occupiedBy).toEqual(ship1);
  expect(testBoard.board[1][0].occupiedBy).toEqual(ship1);
  expect(testBoard.board[2][1].isHit).toEqual(true);
  expect(ship1!.hits).toBe(0);
});

test("sink all ships", () => {
  const testBoard = new GameBoard();
  testBoard.createShip(2, 0, 0);
  testBoard.createShip(3, 1, 2);
  
  testBoard.receiveAttack(0, 0);
  testBoard.receiveAttack(1, 0);
  testBoard.receiveAttack(1, 2);
  testBoard.receiveAttack(2, 2);
  testBoard.receiveAttack(3, 2);

  expect(testBoard.allSunk()).toBe(true);
});

describe("ships cannot be directly adjacent", () => {
  test("no adjacent left", () => {
    const testBoard = new GameBoard();
    const ship1 = testBoard.createShip(2, 2, 0);
    testBoard.createShip(2, 0, 0); // should not be allowed
    expect(testBoard.ships.length).toEqual(1);
    expect(testBoard.board[0][0].occupiedBy).toEqual(undefined);
    expect(testBoard.board[1][0].occupiedBy).toEqual(undefined);
    expect(testBoard.board[2][0].occupiedBy).toEqual(ship1);
    expect(testBoard.board[3][0].occupiedBy).toEqual(ship1);
  });
  test("no adjacent right", () => {
    const testBoard = new GameBoard();
    const ship1 = testBoard.createShip(2, 2, 0);
    testBoard.createShip(2, 4, 0); // should not be allowed
    expect(testBoard.ships.length).toEqual(1);
    expect(testBoard.board[4][0].occupiedBy).toEqual(undefined);
    expect(testBoard.board[5][0].occupiedBy).toEqual(undefined);
    expect(testBoard.board[2][0].occupiedBy).toEqual(ship1);
    expect(testBoard.board[3][0].occupiedBy).toEqual(ship1);
  });
  test("no adjacent up", () => {
    const testBoard = new GameBoard();
    const ship1 = testBoard.createShip(2, 1, 1);
    testBoard.createShip(2, 2, 0); // should not be allowed
    expect(testBoard.ships.length).toEqual(1);
    expect(testBoard.board[2][0].occupiedBy).toEqual(undefined);
    expect(testBoard.board[3][0].occupiedBy).toEqual(undefined);
    expect(testBoard.board[1][1].occupiedBy).toEqual(ship1);
    expect(testBoard.board[2][1].occupiedBy).toEqual(ship1);
  });
  test("no adjacent down", () => {
    const testBoard = new GameBoard();
    const ship1 = testBoard.createShip(2, 2, 0);
    testBoard.createShip(2, 2, 1); // should not be allowed
    expect(testBoard.ships.length).toEqual(1);
    expect(testBoard.board[2][1].occupiedBy).toEqual(undefined);
    expect(testBoard.board[3][1].occupiedBy).toEqual(undefined);
    expect(testBoard.board[2][0].occupiedBy).toEqual(ship1);
    expect(testBoard.board[3][0].occupiedBy).toEqual(ship1);
  });
  test("no adjacent top left", () => {
    const testBoard = new GameBoard();
    const ship1 = testBoard.createShip(2, 2, 2);
    testBoard.createShip(2, 0, 1); // should not be allowed
    expect(testBoard.ships.length).toEqual(1);
    expect(testBoard.board[0][1].occupiedBy).toEqual(undefined);
    expect(testBoard.board[1][1].occupiedBy).toEqual(undefined);
    expect(testBoard.board[2][2].occupiedBy).toEqual(ship1);
    expect(testBoard.board[3][2].occupiedBy).toEqual(ship1);
  });
  test("no adjacent top right", () => {
    const testBoard = new GameBoard();
    const ship1 = testBoard.createShip(2, 2, 2);
    testBoard.createShip(2, 4, 1); // should not be allowed
    expect(testBoard.ships.length).toEqual(1);
    expect(testBoard.board[4][1].occupiedBy).toEqual(undefined);
    expect(testBoard.board[5][1].occupiedBy).toEqual(undefined);
    expect(testBoard.board[2][2].occupiedBy).toEqual(ship1);
    expect(testBoard.board[3][2].occupiedBy).toEqual(ship1);
  });
  test("no adjacent bottom left", () => {
    const testBoard = new GameBoard();
    const ship1 = testBoard.createShip(2, 2, 2);
    testBoard.createShip(2, 0, 3); // should not be allowed
    expect(testBoard.ships.length).toEqual(1);
    expect(testBoard.board[0][3].occupiedBy).toEqual(undefined);
    expect(testBoard.board[1][3].occupiedBy).toEqual(undefined);
    expect(testBoard.board[2][2].occupiedBy).toEqual(ship1);
    expect(testBoard.board[3][2].occupiedBy).toEqual(ship1);
  });
  test("no adjacent bottom right", () => {
    const testBoard = new GameBoard();
    const ship1 = testBoard.createShip(2, 2, 2);
    testBoard.createShip(2, 4, 3); // should not be allowed
    expect(testBoard.ships.length).toEqual(1);
    expect(testBoard.board[4][3].occupiedBy).toEqual(undefined);
    expect(testBoard.board[5][3].occupiedBy).toEqual(undefined);
    expect(testBoard.board[2][2].occupiedBy).toEqual(ship1);
    expect(testBoard.board[3][2].occupiedBy).toEqual(ship1);
  });
});

describe("ship rotations", () => {
  test("valid rotation horizontal to vertical", () => {
    const testBoard = new GameBoard();
    const ship1 = testBoard.createShip(3, 0, 0);
    expect(testBoard.board[0][0].occupiedBy).toEqual(ship1);
    expect(testBoard.board[1][0].occupiedBy).toEqual(ship1);
    expect(testBoard.board[2][0].occupiedBy).toEqual(ship1);
    const rotated = testBoard.rotateShip(0, 0); // take in x, y coord of ship
    expect(testBoard.ships.length).toEqual(1);
    expect(rotated).toEqual(true);
    expect(testBoard.board[0][0].occupiedBy).toEqual(ship1);
    expect(testBoard.board[0][1].occupiedBy).toEqual(ship1);
    expect(testBoard.board[0][2].occupiedBy).toEqual(ship1);
  });

  test("cannot rotate ship back when new one is placed in the way", () => {
    const testBoard = new GameBoard();
    const ship1 = testBoard.createShip(3, 0, 0);
    const rotateVertical = testBoard.rotateShip(0, 0);
    expect(rotateVertical).toBe(true);
    testBoard.createShip(2, 2, 0);
    const rotateHorizontal = testBoard.rotateShip(0, 0);
    expect(testBoard.board[0][0].occupiedBy).toEqual(ship1);
    expect(testBoard.board[0][1].occupiedBy).toEqual(ship1);
    expect(testBoard.board[0][2].occupiedBy).toEqual(ship1);
    expect(rotateHorizontal).toBe(false);
  });

  test("cannot rotate ship out of bounds", () => {
    const testBoard = new GameBoard();
    testBoard.createShip(3, 8, 0);
    const rotateVertical = testBoard.rotateShip(8, 0);
    expect(rotateVertical).toBe(false);
  })
});