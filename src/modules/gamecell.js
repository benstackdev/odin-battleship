export class GameCell {
    _occupiedBy;
    _isHit;
    _isFixed;
    constructor(ship) {
        this._occupiedBy = ship;
        this._isHit = false;
        this._isFixed = true;
    }
    get occupiedBy() { return this._occupiedBy; }
    get isHit() { return this._isHit; }
    get isFixed() { return this._isFixed; }
    set occupiedBy(occupy) { this._occupiedBy = occupy; }
    set isHit(hit) { this._isHit = hit; }
    set isFixed(fixed) { this._isFixed = fixed; }
}
//# sourceMappingURL=gamecell.js.map