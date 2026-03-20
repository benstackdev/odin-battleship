export var ShipOrientation;
(function (ShipOrientation) {
    ShipOrientation[ShipOrientation["HORIZONTAL"] = 0] = "HORIZONTAL";
    ShipOrientation[ShipOrientation["VERTICAL"] = 1] = "VERTICAL";
})(ShipOrientation || (ShipOrientation = {}));
export class Ship {
    _x;
    _y;
    _orientation;
    _length;
    _hits = 0;
    _isSunk = false;
    _shipSegmentHit;
    constructor(len, x, y, orientation = ShipOrientation.HORIZONTAL) {
        this._x = x;
        this._y = y;
        this._length = len;
        this._shipSegmentHit = Array(len).fill(false);
        this._orientation = orientation;
    }
    get hits() { return this._hits; }
    get length() { return this._length; }
    get isSunk() { return this._isSunk; }
    get x() { return this._x; }
    get y() { return this._y; }
    get orientation() { return this._orientation; }
    get shipSegmentHit() { return this._shipSegmentHit; }
    set x(newx) { this._x = newx; }
    set y(newy) { this._y = newy; }
    takeHit(off) {
        if (this.isHit(off) === undefined ||
            this.isHit(off) === true || this._isSunk)
            return;
        this._shipSegmentHit[off] = true;
        if (this._hits < this._length)
            this._hits++;
        if (this._hits === this._length)
            this._isSunk = true;
    }
    isHit(off) {
        if (off < 0 || off > this._length - 1)
            return undefined;
        return this._shipSegmentHit[off];
    }
    flip() {
        this._orientation = (this._orientation === ShipOrientation.VERTICAL)
            ? ShipOrientation.HORIZONTAL : ShipOrientation.VERTICAL;
    }
}
//# sourceMappingURL=ship.js.map