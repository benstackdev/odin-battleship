import { Ship } from "../modules/ship.js";
import { Player } from "../modules/player.js";
import { BoardState } from "../modules/gameboard.js";

test("place ship with player class", () => {
  const player = new Player();
  player.placeShip(2, 0, 0);
  expect(player.playerBoard.ships[0]).toBeInstanceOf(Ship);
  expect(player.playerBoard.board[0]![0]).toEqual(BoardState.ALIVE);
  expect(player.playerBoard.board[1]![0]).toEqual(BoardState.ALIVE);
});

test("successfully attack another player (hit)", () => {
  const player1 = new Player();
  const player2 = new Player();
  player1.placeShip(3, 1, 1);
  player2.placeShip(2, 2, 3);

  player1.attack(player2, 3, 3);
  expect(player2.playerBoard.ships[0]?.hits).toEqual(1);
  expect(player2.playerBoard.board[3]![3]).toEqual(BoardState.HIT);
  expect(player2.playerBoard.board[2]![3]).toEqual(BoardState.ALIVE);
});