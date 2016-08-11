'use strict';

var list = require("flux/list");
var math = require("flux/math");

/**
 * Merges 2 tables
 * 
 * @param {2D Array.<*>}  		Table      First Table.
 * @param {2D Array.<*>}  		Table	   Second Table.
 *
 * @returns {{Table: 2D Array.<*>}}
 */

function size(In) {
	// Get number of columns
	var nrow = list.Length(In)
	// Get number of rows
	var ncols = []
	for (var i = 0; i < nrow; i++){
		ncols.push(list.Length(In[i]))
	}
	var ncol = math.Max(ncols)
	var output = {"nRow":nrow,"nCol":ncol}
    return output;
}

function createArray(len, itm) {
    var arr1 = [itm],
        arr2 = [];
    while (len > 0) {
        if (len & 1) arr2 = arr2.concat(arr1);
        arr1 = arr1.concat(arr1);
        len >>>= 1;
    }
    return arr2;
}

function run(Table_A, Table_B) {
    var temp = Table_A
	var inputASize = size(Table_A)
	var inputBSize = size(Table_B)
	var nullARow = createArray(inputASize.nCol, null)
    var nullBRow = createArray(inputBSize.nCol, null)

	if (!inputBSize.nCol || !inputASize.nCol){
		console.error('Both inputs should tables, rows or columns. Please make sure to provide thr right input types.')
		return;
	}
	
	if (inputASize.nRow < inputBSize.nRow){
		for (var i = 0; i < (inputBSize.nRow - inputASize.nRow); i++){
			temp.push(nullARow)
		}
	}
	
	var Out = []
    var nLim = math.Max([inputASize.nRow,inputBSize.nRow])	
	// Adding values to the input table
	for (var n = 0; n < nLim; n++){
		if (n < inputBSize.nRow){
			Out.push(temp[n].concat(Table_B[n]))
		}
		else{
			Out.push(temp[n].concat(nullBRow))
		}
	}
	
    return {
        Table: Out
    };
}

// Public API
module.exports = {
    run: run
};