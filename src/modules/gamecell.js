export class GameCell {
    _occupiedBy;
    _isHit;
    _isFixed;
    _isValid;
    constructor(ship) {
        this._occupiedBy = ship;
        this._isHit = false;
        this._isFixed = true;
        this._isValid = true;
    }
    get occupiedBy() { return this._occupiedBy; }
    get isHit() { return this._isHit; }
    get isFixed() { return this._isFixed; }
    get isValid() { return this._isValid; }
    set occupiedBy(occupy) { this._occupiedBy = occupy; }
    set isHit(hit) { this._isHit = hit; }
    set isFixed(fixed) { this._isFixed = fixed; }
    set isValid(valid) { this._isValid = valid; }
}
//# sourceMappingURL=gamecell.js.map