export class BoardCell {
    _occupiedBy;
    _isHit;
    constructor(ship) {
        this._occupiedBy = ship;
        this._isHit = false;
    }
    get occupiedBy() { return this._occupiedBy; }
    get isHit() { return this._isHit; }
    set occupiedBy(occupy) { this._occupiedBy = occupy; }
    set isHit(hit) { this._isHit = hit; }
}
//# sourceMappingURL=boardcell.js.map