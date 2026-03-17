import { Ship } from "../modules/ship.js";
import { Player } from "../modules/player.js";
test("place ship with player class", () => {
    const player = new Player();
    const ship1 = player.placeShip(2, 0, 0);
    expect(player.playerBoard.ships[0]).toBeInstanceOf(Ship);
    expect(player.playerBoard.board[0][0].occupiedBy).toEqual(ship1);
    expect(player.playerBoard.board[1][0].occupiedBy).toEqual(ship1);
});
test("successfully attack another player (hit)", () => {
    const player1 = new Player();
    const player2 = new Player();
    player1.placeShip(3, 1, 1);
    const ship2 = player2.placeShip(2, 2, 3);
    player1.attack(player2, 3, 3);
    expect(player2.playerBoard.ships[0]?.hits).toEqual(1);
    expect(player2.playerBoard.board[3][3].isHit).toEqual(true);
    expect(player2.playerBoard.board[2][3].occupiedBy).toEqual(ship2);
});
//# sourceMappingURL=player.test.js.map