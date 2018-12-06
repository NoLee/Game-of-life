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
//# sourceMappingURL=testSpec.js.map