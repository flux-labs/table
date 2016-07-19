'use strict';

var list = require("flux/list");
var math = require("flux/math");

/**
 * Get column based on column name.
 * 
 * @param {2D Array.<*>}  	In      Table.
 * @param {*}  				Name	List.
 * @param {Number}     		Index   Index of the row of column names.
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

function run(In, Name, RowIndex) {
	var inputSize = size(In)
	var nameIndex = 0
	// Set default index to 0 unless stated otherwise
	if (RowIndex != 0 && RowIndex != null){
		nameIndex = index; 
	}
	
	// Checking the type of indexing
	if ((typeof RowIndex) == "string"){
		// Check if string input is numeric
		var numIndex = parseInt(RowIndex)
		if(!numIndex){
			console.error("For row selection using table-indexing, please input a numeric value.")
			return;
		}
		nameIndex = numIndex + 1
	}
	

	// Index error handling
    if (nameIndex >= inputSize.nRow) {
        console.error("Index of row(s) to remove is out of bound. Please provide indexes smaller than the number of rows in the table.");
        return;
    }
    if (nameIndex < 0) {
        console.error("Some index of row(s) to remove is negative. Please provide positive indexes smaller than the number of rows in the table.");
        return;
    }
    
    // Get list of column names
    var names = In[nameIndex]

    // Get index of the row name requested
    var rowIndex = list.IndexOf(names, Name)
    if (rowIndex.Found == false){
    	console.error('Input Name is not valid, please provide a valid column Name.');
    	return;
    }
	
	// Extract the column requested
	var Out = []
    for (var i = 0; i < inputSize.nRow; i++){
    	if (In[i][rowIndex.Out] != undefined){
	    	Out.push([In[i][rowIndex.Out]])
    	}
    	else {
    		break
    	}
    }
	
	// Returning the column requested
    return {
        Column: Out
    };
}

// Public API
module.exports = {
    run: run
};
