'use strict';

var list = require("flux/list");
var math = require("flux/math");

/**
 * Deletes n number of columns at index i, n =DeleteCount, i = index. Index input reads Number type for 0-indexing, String type for table-indexing.
 * 
 * @param {2D Array.<*>}	Table          	Table.
 * @param {Number	   		Index	   		Index to which rows will be deleted. Number type for 0-indexing, String type for table-indexing.
 * @param {Number}     		DeleteCount		Number of rows to delete.
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

function run(Table, Index, DeleteCount) {
	// Don't throw an error when the proper inputs aren't being fed
	if (Table == null || Index == null){
		return;
	}
	
	// Initialization
	var Out = []
	var inputSize = size(Table)
	var Count = 1
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
	
	if (DeleteCount != 1 && DeleteCount != null){
		Count = DeleteCount
	}
	
	// Error handling
	if (rowIndex == null) {
        console.error("Index input is null. Please provide start index to which rows will be deleted from.");
        return;
    }

    if ((rowIndex + Count - 1) >= inputSize.nRow) {
        console.error("Index of column(s) to remove is out of bound. Please provide indexes smaller than the number of rows in the table.");
        return Out = [];
    }
    
    if (rowIndex < 0) {
        console.error("Some index of column(s) to remove is negative. Please provide positive indexes smaller than the number of rows in the table.");
        return Out = [];
    }
    
    if (rowIndex == 0 && Count == inputSize.nRow) {
        return Out = [];
    }
    
    // Get table elements before and after rows to delete
    for (var i = 0; i < rowIndex; i++){
	   		Out.push(Table[i])
	}
    for (var i = rowIndex + Count; i < inputSize.nRow; i++){
	   		Out.push(Table[i])
	}
	
    return {
        Table: Out
    };
}

// Public API
module.exports = {
    run: run
};
