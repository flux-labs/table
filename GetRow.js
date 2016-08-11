'use strict';

var list = require("flux/list");
var math = require("flux/math");

/**
 * Retrieves the row of a table at a specific index. As for the index input use Number type for 0-indexing, String type for table-indexing.
 * 
 * @param {2D Array.<*>}  		Table       Table.
 * @param {Number|String}     	Index       Index at which to retrieve the row. Number for 0-indexing, String for table-indexing
 *
 * @returns {{Row: 2D Array.<*>}}
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

function run(In, Index) {
    var Out = []
	var inputSize = size(In)
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
	
	// Error handling
    if (rowIndex >= inputSize.nRow) {
        console.error("Index out of bound. Please provide an index smaller than the number of rows in the table.");
        return;
    }
    if (rowIndex < 0) {
        console.error("Index is negative. Please provide a positive index smaller than the number of rows in the table.");
        return;
    }
    
    return {
        Row: [list.ItemAt(In, rowIndex)]
    };
}

// Public API
module.exports = {
    run: run
};
