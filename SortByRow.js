'use strict';

var list = require("flux/list");
var math = require("flux/math");

/**
 * Sorts a table based on the values of a given row. Sorting is ascending is Ascending input is true, descending if false.
 * 
 * @param {2D Array.<*>}  		Table       Table.
 * @param {Number|String}     	Index       Index of row to sort table with.
 * @param {Boolean}				Ascending	Toggle to switch between ascending and descending sorting.
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

function getRow(In, Index) {
	var inputSize = size(In)
	var rowIndex = Index
	
	// Checking the type of indexing
	if ((typeof Index) == "string"){
		// Check if string input is numeric
		var numIndex = parseInt(Index)
		if(!numIndex){
			console.error("For row selection using table-indexing, please input a numeric value.")
			return {"flag": true};
		}
		rowIndex = numIndex - 1
	}
	
	// Error handling
    if (rowIndex >= inputSize.nRow) {
        console.error("Index out of bound. Please provide an index smaller than the number of rows in the table.");
        return {"flag": true};
    }
    if (rowIndex < 0) {
        console.error("Index is negative. Please provide a positive index smaller than the number of rows in the table.");
        return {"flag": true};
    }
    
    // Output
    return {
        "row": In[rowIndex],
        "flag": false
    };
}

function run(Table, RowIndex, Ascending) {
	var tableSize = size(Table)
	var nRow = tableSize.nRow
	var nCol = tableSize.nCol
	if (Table == null){
		console.error ("Please input Table to sort.")
		return;
	}
	// Default values for ColIndex and Acsending
	var rowIndex = 0
	if (RowIndex != null){
		rowIndex = RowIndex
	}
	var ascend = true
	if (Ascending != null){
		ascend = Ascending
	}
	// Sort Column
	var sortRow = getRow(Table, rowIndex)
	if (sortRow.flag == true){
		return;
	}
	var listToOrder = list.Flatten(sortRow.row)
	var order = list.Sort(listToOrder)
	var indexOrder = order.Permutation
	var Out = []
	if (ascend){
		for (var i = 0; i < nRow; i++){
			var currRow = []
			for (var j = 0; j < nCol; j++){
				currRow.push(Table[i][indexOrder[j]])
			}
			Out.push(currRow)
		}
	}
	else {
		for (var i = 0; i < nRow; i++){
			var currRow = []
			for (var j = 0; j < nCol; j++){
				currRow.push(Table[i][indexOrder[nCol - j - 1]])
			}
			Out.push(currRow)
		}
	}
	
	return {
		Table: Out
	};
}

module.exports = {
    run: run
};
