"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameOfLife = /** @class */ (function () {
    function GameOfLife(height, width) {
        this.height = height;
        this.width = width;
        this.generation = 0;
        this.grid = [];
    }
    /**
     * Checks if a cell is alive
     */
    GameOfLife.prototype.isAlive = function (x) {
        return x;
    };
    GameOfLife.prototype.incrementGeneration = function () {
        this.generation++;
    };
    /**
     * Calculates the live neighbors of a cell
     * @param i Row index for the cell
     * @param j Column index for the cell
     * @returns the number of live neighbors
     */
    GameOfLife.prototype.calculateLiveNeighbors = function (row, col) {
        var count = 0;
        for (var i = Math.max(0, row - 1); i <= Math.min(row + 1, this.height - 1); i++) {
            for (var j = Math.max(0, col - 1); j <= Math.min(col + 1, this.width - 1); j++) {
                if (i != row || j != col) {
                    if (this.isAlive(this.grid[i][j]))
                        count++;
                }
            }
        }
        return count;
    };
    /**
     * Calculates next state of the cell according to the Game of Life rules
     * @param i Row index for the cell
     * @param j Column index for the cell
     */
    GameOfLife.prototype.calculateNextCellState = function (row, col) {
        var liveNeighbors = this.calculateLiveNeighbors(row, col);
        var nextCellState;
        if (this.isAlive(this.grid[row][col])) {
            if (liveNeighbors < 2 || liveNeighbors > 3)
                nextCellState = 0;
            else
                nextCellState = 1;
        }
        else { //cell is dead
            if (liveNeighbors === 3)
                nextCellState = 1;
            else
                nextCellState = 0;
        }
        return nextCellState;
    };
    GameOfLife.prototype.nextGeneration = function () {
        var _this = this;
        //Calculate next generation to a new array
        this.grid = this.grid.map(function (row, i) { return row.map(function (cell, j) { return _this.calculateNextCellState(i, j); }); });
        this.incrementGeneration();
        return this.grid;
    };
    return GameOfLife;
}());
exports.GameOfLife = GameOfLife;
//# sourceMappingURL=gameOfLife.js.map