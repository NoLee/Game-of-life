export{ GameOfLife };

class GameOfLife{

    grid: number[][];

    constructor (public height:number,public width:number ){
    }

    /**
     * Checks if a cell is alive
     */
    isAlive (x:number):number {
        return x;
    }

    /**
     * Calculates the live neighbors of a cell
     * @param i Row index for the cell
     * @param j Column index for the cell
     */
    calculateLiveNeighbors(row:number, col:number):number {
        let count=0;
        for(let i=Math.max(0,row-1); i<=Math.min(row+1,this.height-1); i++){
            for (let j=Math.max(0,col-1); j<=Math.min(col+1,this.width-1); j++){
                if (i != row || j != col){
                    if  (this.isAlive(this.grid[i][j])) count++
                }
            }
        } 
        return count;
    }

    /**
     * Calculates next state of the cell according to the Game of Life rules 
     * @param i Row index for the cell
     * @param j Column index for the cell
     */    
    calculateNextCellState(row:number,col:number){
        let liveNeighbors:number = this.calculateLiveNeighbors(row,col)
        let nextCellState:number = undefined;

        if (this.isAlive(this.grid[row][col])){
            if (liveNeighbors<2 || liveNeighbors>3) nextCellState = 0;
            else nextCellState = 1;
        }
        else{ //cell is dead
            if (liveNeighbors === 3) nextCellState = 1;
            else nextCellState = 0;
        }
        return nextCellState;
    }
}

let GoL2 = new GameOfLife(4,3);
// GoL.grid = parseHtmlTable();
GoL2.grid =  [[0,0,0],
            [0,1,1],
            [0,1,0],
            [0,1,0]];

// GoL.grid = GoL.grid.map((row,i) => row.map( (cell,j) => GoL.calculateNextCellState(i,j)));


function testing() {
    document.getElementById("test").innerHTML = " ";
    
    for (let i=0;i<GoL2.grid.length;i++){
        document.getElementById("test").innerHTML += "<br>";
        for (let j=0;j<GoL2.grid[0].length;j++)
        {
            document.getElementById("test").innerHTML += GoL2.grid[i][j].toString();
        }
    }
    GoL2.grid = GoL2.grid.map((row,i) => row.map( (cell,j) => GoL2.calculateNextCellState(i,j)));
}

setInterval(function(){ testing(); }, 1000);
