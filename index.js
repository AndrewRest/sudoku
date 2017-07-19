"use strict";
let game = [ //input data
      [0, 0, 0, 2, 6, 0, 7, 0, 1],
      [6, 8, 0, 0, 7, 0, 0, 9, 0],
      [1, 9, 0, 0, 0, 4, 5, 0, 0],
      [8, 2, 0, 1, 0, 0, 0, 4, 0],
      [0, 0, 4, 6, 0, 2, 9, 0, 0],
      [0, 5, 0, 0, 0, 3, 0, 2, 8],
      [0, 0, 9, 3, 0, 0, 0, 7, 4],
      [0, 4, 0, 0, 5, 0, 0, 3, 6],
      [7, 0, 3, 0, 1, 8, 0, 0, 0]
    ];

//Start programm
if(!isGameValid()) {
    console.log("Your initial game is not valid");
} else {
    console.log("Start processing...");
    findSolution();
}

function findSolution() {
    let emptyCells = findEmptyCells();
    for(let i = 0; i < emptyCells.length;) {
        let row = emptyCells[i][0];
        let col = emptyCells[i][1];
        let value = game[row][col] + 1;
        let isFound = false;
        while(!isFound && value <= 9) {
            game[row][col] = value;
            if(isGameValid()) {
                isFound = true;
                i++;
            } else {
                game[row][col] = 0;
                value++;
            }
        }
        if(!isFound) {
            game[row][col] = 0;
            i--;
        }
    }
    if(isFull() && isGameValid()) {
        console.log("Solution:");
        print();
    } else {
        console.log("There are no solutions");
    }
};

function findEmptyCells() {
    let emptyCells = [];
    for(let row = 0; row < 9; row++) {
        for(let col = 0; col < 9; col++) {
            if(game[row][col] === 0) {
                emptyCells.push([row, col]);
            }
        }
    }
    return emptyCells;
};

function isGameValid() {
    for(let i = 0; i < 9; i++) {
        if(!isValidRow(i) ||
           !isValidColumn(i)) {
            return false;
        }
    }
    return true && isValidBoxes();
}

function isValidRow(rowIndex) {
    let values = new Set();
    for(let i = 0; i < 9; i++) {
        let element = game[rowIndex][i];
        if(element < 0 || element > 9) {
            return false;
        }
        if(element != 0) {
            if(values.has(element)) {
                return false;
            } else {
                values.add(element);
            }
        }
    }
    return true;
}

function isValidColumn(colIndex) {
    let values = new Set();
    for(let i = 0; i < 9; i++) {
        let element = game[i][colIndex];
        if(element < 0 || element > 9) {
            return false;
        }
        if(element != 0) {
            if(values.has(element)) {
                return false;
            } else {
                values.add(element);
            }
        }
    }
    return true;
}

function isValidBoxes() {
    for(let boxRow = 0; boxRow < 3; boxRow++) {
        for(let boxCol = 0; boxCol < 3; boxCol++){
            let bucket = new Set();
            for(let row = 0 + 3*boxRow; row < 3 + 3*boxRow; row++ ) {
                for(let col = 0 + 3*boxCol; col < 3 + 3*boxCol; col ++) {
                    let element = game[row][col];
                    if(element != 0) {
                        if(bucket.has(element)) {
                            return false;
                        } else {
                            bucket.add(element);
                        }
                    }
                }
            }
        }
    }
    return true;
}

function isFull() {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            if (game[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

function print() {
    console.log("--Sudoku start--");
    game.forEach(array => {console.log(array)});
    console.log("--Sudoku end--");
}
