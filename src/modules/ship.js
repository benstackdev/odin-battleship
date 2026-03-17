export var ShipOrientation;
(function (ShipOrientation) {
    ShipOrientation[ShipOrientation["HORIZONTAL"] = 0] = "HORIZONTAL";
    ShipOrientation[ShipOrientation["VERTICAL"] = 1] = "VERTICAL";
})(ShipOrientation || (ShipOrientation = {}));
export class Ship {
    _x;
    _y;
    _orientation = ShipOrientation.HORIZONTAL;
    _length;
    _hits = 0;
    _isSunk = false;
    _damage;
    constructor(len, x = 0, y = 0) {
        this._x = x;
        this._y = y;
        this._length = len;
        this._damage = Array(len).fill(false);
    }
    get hits() { return this._hits; }
    get length() { return this._length; }
    get isSunk() { return this._isSunk; }
    get x() { return this._x; }
    get y() { return this._y; }
    get orientation() { return this._orientation; }
    get damage() { return this._damage; }
    hit(off) {
        if (this.isDamaged(off) === undefined ||
            this.isDamaged(off) === true || this._isSunk)
            return;
        this._damage[off] = true;
        if (this._hits < this._length)
            this._hits++;
        if (this._hits === this._length)
            this._isSunk = true;
    }
    isDamaged(off) {
        if (off < 0 || off > this._length - 1)
            return undefined;
        return this._damage[off];
    }
    rotate() {
        this._orientation = (this._orientation === ShipOrientation.HORIZONTAL) ? ShipOrientation.VERTICAL : ShipOrientation.HORIZONTAL;
    }
}
//# sourceMappingURL=ship.js.map