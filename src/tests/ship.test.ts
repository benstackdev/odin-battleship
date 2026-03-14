import { Ship } from "../modules/ship.js";

test("increase number of hits by 1", () => {
  const testShip = new Ship(4);
  testShip.hit();
  expect(testShip.hits).toEqual(1);
});

test("increase number of hits by 2", () => {
  const testShip = new Ship(4);
  testShip.hit();
  testShip.hit();
  expect(testShip.hits).toEqual(2);
});

test("hit ship until sunk", () => {
  const testShip = new Ship(3);
  testShip.hit();
  testShip.hit();
  testShip.hit();
  expect(testShip.isSunk).toEqual(true);
});

test("cannot hit ship after it's sunk", () => {
  const testShip = new Ship(2);
  testShip.hit();
  testShip.hit();
  testShip.hit();
  expect(testShip.hits).toEqual(2);
});