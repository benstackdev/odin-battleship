import type { Ship } from "./ship.js";
export declare class ShipDraggable {
    private _ship;
    private _element;
    private _isMouseDown;
    private _isDragging;
    private _startX;
    private _startY;
    constructor(ship: Ship);
    get element(): HTMLDivElement;
    mouseDown(e: MouseEvent): void;
    mouseUp(): void;
}
//# sourceMappingURL=ship_draggable.d.ts.map