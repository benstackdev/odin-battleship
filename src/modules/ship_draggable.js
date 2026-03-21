export class ShipDraggable {
    _ship;
    _element;
    _isMouseDown;
    _isDragging;
    _startX = 0;
    _startY = 0;
    constructor(ship) {
        this._ship = ship;
        this._isDragging = false;
        this._isMouseDown = false;
        this._element = document.createElement("div");
        this._element.className = "ship-draggable";
        this._element.dataset.length = String(ship.length);
        this._element.draggable = true;
        this._element.addEventListener("mousedown", this.mouseDown);
        this._element.addEventListener("dragstart", () => { console.log("drag start"); });
        this._element.addEventListener("drag", (e) => {
            console.log(`${e.pageX}, ${e.pageY}`);
        });
        this._element.addEventListener("dragend", () => { console.log("drag end"); });
    }
    get element() { return this._element; }
    mouseDown(e) {
    }
    mouseUp() {
    }
}
//# sourceMappingURL=ship_draggable.js.map