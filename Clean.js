'use strict';

var list = require("flux/list");
var math = require("flux/math");
/**
 * Clean a table from empty rows or columns.
 * 
 * @param {2D Array<*>}		Table		Table to trim.
 * 
 * @return {Table: 2D Array<*>}
 *
 */

function size(In) {
	// Error handling
	if ((typeof In) == "string" || !list.Length(In)){
		console.error("The input is not a proper table format. Please input a table.")
		return;
	}
	// Get number of columns
	var nrow = list.Length(In)
	// Get number of rows
	var ncols = []
	for (var i = 0; i < nrow; i++){
		ncols.push(list.Length(In[i]))
	}
	var ncol = math.Max(ncols)
    return {
        "nRow": nrow,
        "nCol": ncol
    };
}

function isFalsy(element, index, array){
	return (!element)
}

function cleanTableColumns(table){
	var tableSize = size(table)
	var deleteColInd = []
	for (var c = 0; c < tableSize.nCol; c++){
		var currCol = []
		for (var r = 0; r < tableSize.nRow; r++){
	    	if (table[r][c] != undefined){
		    	currCol.push([table[r][c]])
	    	}
	    	else {
	    		break
	    	}
	    }
	    if (currCol.every(isFalsy)){
	    	deleteColInd.push(c)
	    }
	}
	var Out = []
	for (var r = 0; r < tableSize.nRow; r++){
    	var row = table[r]
    	var newRow = []
    	for (var c = 0; c < tableSize.nCol; c++){
    		if (!(deleteColInd.indexOf(c) >= 0)){
    			newRow.push(row[c])
    		}
    	}
	    Out.push(newRow)
	}
	return Out
}

function cleanTableRows(table){
	var tableSize = size(table)
	var Out = []
	for (var r = 0; r < tableSize.nRow; r++){
		var currRow = table[r]
	    if (!currRow.every(isFalsy)){
	    	Out.push(currRow)
	    }
	}
	return Out
}

function run(Table) {
	var tableColCleaned = cleanTableColumns(Table)
	var tableRowCleaned = cleanTableRows(tableColCleaned)
	return{
		Table: tableRowCleaned
	};
}

module.exports = {
    run: run
};
