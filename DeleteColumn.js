'use strict';

var list = require("flux/list");
var math = require("flux/math");

/**
 * Deletes n number of columns at index i, n =DeleteCount, i = index. Index input reads Number type for 0-indexing, String type for table-indexing.
 * 
 * @param {2D Array.<*>}	In          	Table.
 * @param {Number}	   		Index	   		Index to which columns will be deleted. Number type for 0-indexing, String type for table-indexing.
 * @param {Number}     		DeleteCount		Number of columns to delete.
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
	// Don't throw an error when block isn't been fed the proper inputs
	if (Table == null || Index == null){
		return;
	}
	// Initialization
	var Out = []
	var inputSize = size(Table)
	var Count = 1
	var colIndex = Index
	// Reading from index set as alphabetical values
	if ((typeof Index) == "string"){
		var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
		// Checking that the characters of the index are numeric
		var getNumIndex = parseInt(Index)
		if (getNumIndex){
			console.error("For column selection with table-indexing, please input alphabetical values.")
			return;
		}
		if (Index.length == 1){
			var firstLetterIndex = list.IndexOf(alphabet,Index[0].toLowerCase())
			colIndex = firstLetterIndex.Out
		}
		else if (Index.length == 2){
			var firstLetterIndex = list.IndexOf(alphabet,Index[0].toLowerCase())
			var secondLetterIndex = list.IndexOf(alphabet,Index[1].toLowerCase())
			colIndex = (firstLetterIndex.Out + 1)*26 + secondLetterIndex.Out
		}
		else if (Index.length == 3){
			var firstLetterIndex = list.IndexOf(alphabet,Index[0].toLowerCase())
			var secondLetterIndex = list.IndexOf(alphabet,Index[1].toLowerCase())
			var thirdLetterIndex = list.IndexOf(alphabet,Index[2].toLowerCase())
			colIndex = (firstLetterIndex.Out + 1)*26*26+ (secondLetterIndex.Out + 1)*26 + thirdLetterIndex.Out
		}
		else {
			console.error("Your table has seriously more than 18226 columns? Maybe that table-indexing isn't the most appropriate in that case... try using 0-indexing!")
			return;
		}
	}
	

	if (DeleteCount != 1 && DeleteCount != null){
		Count = DeleteCount
	}

	if (colIndex == null) {
        console.error("Index input is null. Please provide start index to which columns will be deleted from.");
        return;
    }

    if ((colIndex + Count - 1) >= inputSize.nCol) {
        console.error("Index of column(s) to remove is out of bound. Please provide indexes smaller than the number of columns in the table.");
        return Out = [];
    }
    
    if (colIndex < 0) {
        console.error("Some index of column(s) to remove is negative. Please provide positive indexes smaller than the number of columns in the table.");
        return Out = [];
    }
    
    if (colIndex == 0 && Count == inputSize.nCol) {
        return Out = [];
    }
    
    for (var i = 0; i < inputSize.nRow; i++){
    	var row = Table[i]
    	var newRow = (row.slice(0, colIndex)).concat(row.slice(colIndex + Count, inputSize.nCol))
	    Out.push(newRow)
	}
	
    return {
        Table: Out
    };
}

// Public API
module.exports = {
    run: run
};
