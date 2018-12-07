"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameOfLife_1 = require("./gameOfLife");
var height;
var width;
var globalInterval;
//** FUNCTIONS FOR EVENT LISTENERS
$("#drawGrid").click(function () {
    height = parseInt(document.getElementById("height").value);
    width = parseInt(document.getElementById("width").value);
    $("#gridContainer").show();
    drawHTMLGrid(height, width, "grid");
});
$("#start").click(function () {
    var gameofLife = new gameOfLife_1.GameOfLife(height, width);
    globalInterval = setInterval(function () { nextGeneration(gameofLife); }, 500);
});
$("#stop").click(function () {
    clearInterval(globalInterval);
});
/**
 * Calculate next generation
 */
function nextGeneration(gameOfLife) {
    // Get the grid state from HTML and set it to the gameoflife grid instance
    gameOfLife.grid = getHTMLGrid(gameOfLife);
    // Calculate next generation
    var nextGen = gameOfLife.nextGeneration();
    //Redraw HTMl grid
    redrawHTMLGrid(nextGen, "grid");
    $("#genCount").html(gameOfLife.generation + "");
}
/**
 * Redraw the HTML table when needed ( eg when we change the generation)
 */
function redrawHTMLGrid(grid, gridID) {
    var gridHTML = document.getElementById(gridID);
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            var cell = gridHTML.rows[i].cells[j];
            if (grid[i][j])
                cell.className = "selected";
            else
                cell.className = "";
        }
    }
}
/**
 * Draw a grid (html table) according to the input values for height and width of user
 */
function drawHTMLGrid(height, width, gridID) {
    var gridHTML = document.getElementById(gridID);
    // Clear previous table and stop game of life algorithm
    gridHTML.innerHTML = "";
    clearInterval(globalInterval);
    // Create html table
    for (var i = 0; i < height; i++) {
        var row = gridHTML.insertRow(0);
        for (var j = 0; j < width; j++) {
            var cell = row.insertCell(0);
            cell.innerHTML = "";
        }
    }
    // Onclick a table element, change its class 
    $(".grid td").click(function () {
        if (this.className == "")
            this.className = "selected";
        else
            this.className = "";
    });
}
/**
 * Get the grid state from HTML
 * @returns an array with the grid, cell values are [1] if the cell is selected and [0] if it is not
 */
function getHTMLGrid(gameofLife) {
    var gridHTML = document.getElementById("grid");
    var array = [];
    for (var i = 0, row = void 0; row = gridHTML.rows[i]; i++) {
        array[row.rowIndex] = [];
        for (var j = 0, col = void 0; col = row.cells[j]; j++) {
            if (col.className == "selected")
                array[row.rowIndex][col.cellIndex] = 1;
            else
                array[row.rowIndex][col.cellIndex] = 0;
        }
    }
    return array;
}
//# sourceMappingURL=UI.js.map