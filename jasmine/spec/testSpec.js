
describe("calculateLiveNeighbors function", function() {

    beforeEach(function() {
        game  = new GameOfLife(3,3);
    });

    it("calculates the alive neighbors of a cell", function() {
        expect(true).toBe(true);
        let testArray =[[0,1,0],
                        [0,1,0],
                        [0,1,0]];

        game.grid = testArray;
        expect(game.calculateLiveNeighbors(0,1)).toEqual(1);
    });
});
