'use strict';

var list = require("flux/list");
var math = require("flux/math");

/**
 * Generate a table of random values.
 * 
 * @param {Number}     nRow       Number of rows in the array.
 * @param {Number}     nCol       Number of columns in the array.
 *
 * @returns {{Table: 2D Array.<*>}}
 */

function createArray(nRow, nCol) {
    var arr2 = [];
    for (var n = 0; n < nCol; n++) {
    	var arr1 = []
		for (var m = 0; m < nRow; m++) {
			arr1.push(Math.random())
		}
	   	arr2.push(arr1)
	}
    return arr2;
}

function run(nRow, nCol) {
	var numbRow = 1
	var numbCol = 1
	
    if (nRow != null && nRow != 1){
    	numbRow = nRow
    }
    
    if (nCol != null && nCol != 1){
    	numbCol = nCol
    }
    
    return {
        Table: createArray(numbRow, numbCol)
    };
}

// Public API
module.exports = {
    run: run
};