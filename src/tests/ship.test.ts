// TODO: update test set

import { Ship, ShipOrientation } from "../modules/ship.js";

test("increase number of hits by 1", () => {
  const testShip = new Ship(4);
  testShip.hit(0);
  expect(testShip.hits).toEqual(1);
});

test("increase number of hits by 2", () => {
  const testShip = new Ship(4);
  testShip.hit(0);
  testShip.hit(1);
  expect(testShip.hits).toEqual(2);
});

test("hit ship until sunk", () => {
  const testShip = new Ship(3);
  testShip.hit(0);
  testShip.hit(1);
  testShip.hit(2);
  expect(testShip.isSunk).toEqual(true);
});

test("cannot hit ship after it's sunk", () => {
  const testShip = new Ship(2);
  testShip.hit(0);
  testShip.hit(1);
  testShip.hit(1);
  expect(testShip.hits).toEqual(2);
});

test("invalid hit offset", () => {
  const testShip = new Ship(2);
  testShip.hit(2);
  expect(testShip.hits).toEqual(0);
  expect(testShip.damage[0]).toEqual(false);
  expect(testShip.damage[1]).toEqual(false);
});

test("hit length 3 ship twice in front two squares", () => {
  const testShip = new Ship(3);
  testShip.hit(2);
  testShip.hit(1);
  expect(testShip.hits).toEqual(2);
  expect(testShip.damage[0]).toEqual(false);
  expect(testShip.damage[1]).toEqual(true);
  expect(testShip.damage[2]).toEqual(true);
});

test("flip ship from horizontal to vertical", () => {
  const testShip = new Ship(3);
  testShip.rotate();
  expect(testShip.orientation === ShipOrientation.VERTICAL);
});

test("flip ship from horizontal to vertical to horizontal", () => {
  const testShip = new Ship(3);
  testShip.rotate();
  testShip.rotate();
  expect(testShip.orientation === ShipOrientation.HORIZONTAL);
});