'use strict';

var list = require("flux/list");
var math = require("flux/math");

/**
 * Searches for a value in a given row of a table, and then returns a value in the same column from a row you specify in the table.
 * 
 * @param {2D Array.<*>}  	In      			Table.
 * @param {*}  				LookupValue			Value to search.
 * @param {Number}     		LookupRowIndex   	Row index to search the value in.
 * @param {Number}			ReturnRowIndex		Row index to return the value from.
 *
 * @returns {{Out: 2D Array.<*>}}
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

function interpretIndex(index, tableSize) {
    var rowIndex = index
	// Checking the type of indexing
	if ((typeof index) == "string"){
		// Check if string input is numeric
		var numIndex = parseInt(index)
		if(!numIndex){
			console.error("For row selection using table-indexing, please input a numeric value.")
			return {"flag": true};
		}
		rowIndex = numIndex - 1
	}
	
	// Error handling
    if (rowIndex >= tableSize.nRow) {
        console.error("Index out of bound. Please provide an index smaller than the number of rows in the table.");
        return {"flag": true};
    }
    if (rowIndex < 0) {
        console.error("Index is negative. Please provide a positive index smaller than the number of rows in the table.");
        return {"flag": true};
    }
    
    return {
        "index": rowIndex,
        "flag": false
    };
}

function run(Table, LookupValue, LookupRowIndex, ReturnRowIndex) {
	if (Table == null || LookupValue == null || ReturnRowIndex == null){
		console.error("Please provide all mandatory inputs: Table, LookupValue and ReturnRowIndex.")
		return;
	}
	var inputSize = size(Table)
	var lookupRowIndex = 0
	if (LookupRowIndex != null){
		lookupRowIndex = LookupRowIndex
	}
	var lookupRowI = interpretIndex(lookupRowIndex, inputSize)
	if (lookupRowI.flag == true){
		return;
	}
	var returnRowI = interpretIndex(ReturnRowIndex, inputSize)
	if (returnRowI.flag == true){
		return;
	} 
	
    // Extract the row in which the searched & to-return value lives
	var returnRow = Table[returnRowI.index]
	var searchRow = Table[lookupRowI.index]

    // Get index of the lookup value requested
    var valIndex = list.IndexOf(searchRow, LookupValue)
    if (valIndex.Found == false){
    	console.error('Input LookupValue is not valid, please provide a valid value to lookup.');
    	return;
    }
	
	// Returning the column requested
    return {
        Value: returnRow[valIndex.Out]
    };
}

// Public API
module.exports = {
    run: run
};
