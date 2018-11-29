import { GameOfLife } from "./gameOfLife";

var GoL;
var i=0;
var globalInterval;

function nextStepToHTML(){
    //calculate next grid
    //GoL.grid = GoL.grid.map((row,i) => row.map( (cell,j) => GoL.calculateNextCellState(i,j)));

    //write the new grid to html
    //using handlebars

    console.log(i);
    i++;
}

/**
 * Draw a grid (html table) according to the input values for height and width of user
 */


function createGridArray(height,width): void{
    //create grid from HTML
    //grid is an array[height][width]
    let testArray: number[][] = [[0,1,0],
                                [0,1,0],
                                [0,1,0]]

    GoL = new GameOfLife(height,width);
    GoL.grid = testArray; 
}

// ****** FUNCTIONS FOR EVENT LISTENERS

/**
 * onclick a td, change its class
 */
$(".grid td").click(function(){
    if (this.className == "") this.className = "selected";
    else this.className = "";
 });

$("#drawGrid").click( function (){
    let height = (<HTMLInputElement>document.getElementById("height")).value;
    let width = (<HTMLInputElement>document.getElementById("width")).value;
    console.log(height,width);  
    createGridArray(height,width);  
    //draw grid using handlebars
})

$("#start").click(function() {
    //calculates and paints the new grid ever xxxx ms
    globalInterval = setInterval(function(){ nextStepToHTML() }, 1000);
})

$("#stop").click(function() {
    clearInterval(globalInterval);
})
