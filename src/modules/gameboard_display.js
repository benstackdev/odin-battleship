import { GameBoard } from "./gameboard.js";
import { ShipOrientation } from "./ship.js";
export class GameBoardDisplay {
    gameDiv = document.querySelector(".game");
    _BOARD_SIZE = 10;
    _gameBoard;
    _gameBoardDiv = document.createElement("div");
    constructor(board) {
        this._gameBoard = board;
        this._gameBoardDiv.className = "game-board";
        if (this.gameDiv !== null)
            this.gameDiv.appendChild(this._gameBoardDiv);
        this.initDisplay();
    }
    initDisplay() {
        for (let i = 0; i < this._BOARD_SIZE; i++) {
            for (let j = 0; j < this._BOARD_SIZE; j++) {
                // eventual refactor to use GameCellDisplay object
                const cell = document.createElement("div");
                cell.className = `game-board-cell x-${j} y-${i}`;
                cell.addEventListener("click", (e) => {
                    e.preventDefault();
                    this._gameBoard.board[i][j].isHit = true;
                    console.log(this._gameBoard);
                    cell.classList.add("hit");
                });
                // add x axis label
                if (i == 0) {
                    const xAxisMarker = document.createElement("div");
                    xAxisMarker.className = "x-axis-marker";
                    xAxisMarker.textContent = `${"ABCDEFGHIJ".charAt(j)}`;
                    cell.appendChild(xAxisMarker);
                }
                // add y axis label 
                if (j == 0) {
                    const yAxisMarker = document.createElement("div");
                    // add origin marker if at origin for special transform
                    if (i === 0)
                        yAxisMarker.className = "y-axis-marker origin";
                    else
                        yAxisMarker.className = "y-axis-marker";
                    yAxisMarker.textContent = `${i + 1}`;
                    cell.appendChild(yAxisMarker);
                }
                this._gameBoardDiv.appendChild(cell);
            }
        }
    }
    updateDisplay() {
        for (const ship of this._gameBoard.ships) {
            for (let i = 0; i < ship.length; i++) {
                const xoff = (ship.orientation === ShipOrientation.HORIZONTAL) ? i : 0;
                const yoff = (ship.orientation === ShipOrientation.VERTICAL) ? i : 0;
                const cell = document.querySelector(`.x-${ship.x + xoff}.y-${ship.y + yoff}`);
                console.log(cell);
                cell?.classList.add("ship");
            }
        }
    }
}
//# sourceMappingURL=gameboard_display.js.map