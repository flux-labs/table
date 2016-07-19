'use strict';

var list = require("flux/list");
var math = require("flux/math");

/**
 * Insert values at a certain row index. Index input reads Number type for 0-indexing, String type for table-indexing.
 * 
 * @param {2D Array.<*>}  				Table       Table.
 * @param {Number|String}     			Index       Index of insertion. Number type for 0-indexing, String type for table-indexing.
 * @param {1D Array.<*>|2D Array.<*>}  	Values	    Values to insert.
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

function run(Table, Index, Values) {
    var Out = Table
	var inputSize = size(Table)
	var valSize = size(Values)
	var rowIndex = Index
	
	// Checking the type of indexing
	if ((typeof Index) == "string"){
		// Check if string input is numeric
		var numIndex = parseInt(Index)
		if(!numIndex){
			console.error("For row selection using table-indexing, please input a numeric value.")
			return;
		}
		rowIndex = numIndex - 1
	}
	
	if (rowIndex > inputSize.nRow) {
        console.error("Index out of bound. Please provide an index smaller than the number of rows in the table.");
        return;
    }
    
    if (rowIndex < 0) {
        console.error("Index is negative. Please provide a positive index smaller than the number of rows in the table.");
        return;
    }
    
    // Deal with 1D array input
    var values = Values
    if (!valSize.nCol){
    	values = [Values]
    }
    valSize = size(values)
    
    // Inserting the row in input table
    for (var n = 0; n < valSize.nRow; n++){
	    Out.splice(rowIndex + n, 0, values[n])
	    console.log(values[n])
	}
	
    return {
        Table: Out
    };
}

// Public API
module.exports = {
    run: run
};
