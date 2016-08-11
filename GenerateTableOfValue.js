'use strict';

var list = require("flux/list");
var math = require("flux/math");

/**
 * Generate a table of values.
 * 
 * @param {Number}     nRow       Number of rows in the array.
 * @param {Number}     nCol       Number of columns in the array.
 * @param {*}		   Value	  Value of each cell of the array.
 *
 * @returns {{Table: 2D Array.<*>}}
 */

function createArray(nRow, nCol, itm) {
    var arr1 = [itm],
    arr2 = [],
    arr3 = [];
	while (nRow > 0) {
		if (nRow & 1) arr2 = arr2.concat(arr1);
		arr1 = arr1.concat(arr1);
		nRow >>>= 1;
	}
    for (var n = 0; n < nCol; n++) {
    	arr3.push(arr2)
	}
    return arr3;
}

function run(nRow, nCol, Value) {
	var val = null
	var numbRow = 1
	var numbCol = 1
	
    if (nRow != null && nRow != 1){
    	numbRow = nRow
    }
    
    if (nCol != null && nCol != 1){
    	numbCol = nCol
    }

    if (Value != null){
    	val = Value
    }
	
    return {
        Table: createArray(numbRow, numbCol, val)
    };
}

// Public API
module.exports = {
    run: run
};