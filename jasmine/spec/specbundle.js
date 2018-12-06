(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameOfLife_1 = require("../../gameOfLife");
describe("Game of life class has a function that", function () {
    var testArray = [[0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 1]];
    var game = new gameOfLife_1.GameOfLife(5, 5);
    game.grid = testArray;
    beforeEach(function () {
    });
    it("calculates the alive neighbors of a cell (calculateLiveNeighbors)", function () {
        expect(game.calculateLiveNeighbors(1, 1)).toEqual(2);
        expect(game.calculateLiveNeighbors(1, 3)).toEqual(1);
        expect(game.calculateLiveNeighbors(1, 2)).toEqual(4);
        expect(game.calculateLiveNeighbors(0, 0)).toEqual(1); //edge case for the upper left corner of table
        expect(game.calculateLiveNeighbors(0, 4)).toEqual(1); //edge case for the upper right corner of table
        expect(game.calculateLiveNeighbors(4, 0)).toEqual(1); //edge case for the lower left corner of table
        expect(game.calculateLiveNeighbors(4, 4)).toEqual(1); //edge case for the lower right corner of table
        expect(game.calculateLiveNeighbors(1, 4)).toEqual(1); //edge case for right border
        expect(game.calculateLiveNeighbors(2, 4)).toEqual(2); //edge case for right border
    });
    it('calculates next cell state according to its neighbors (calculateNextCellState)', function () {
        //test live cells
        expect(game.calculateNextCellState(1, 1)).toEqual(1); //2 neighbors
        expect(game.calculateNextCellState(2, 1)).toEqual(1); //3 neighbors
        expect(game.calculateNextCellState(1, 3)).toEqual(1); //1 neighbors
        //test dead cells
        expect(game.calculateNextCellState(3, 1)).toEqual(1); //dead -> alive
        expect(game.calculateNextCellState(0, 0)).toEqual(0); //dead-> dead
    });
});

},{"../../gameOfLife":1}]},{},[2,1]);
