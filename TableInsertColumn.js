'use strict';

var list = require("flux/list");
var math = require("flux/math");

/**
 * Insert values at a certain column index. Index input reads Number type for 0-indexing, String type for table-indexing.
 * 
 * @param {2D Array.<*>}  				Table      Table.
 * @param {Number|String}     			Index      Index of insertion. Number type for 0-indexing, String type for table-indexing.
 * @param {1D Array.<*>|2D Array.<*>}  	Values	   Values to insert.
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

function run(Table, Index, Values) {
    var Out = Table
	var inputSize = size(Table)
	var valSize = size(Values)
    var nullRow = createArray(inputSize.nCol, null)
	var colIndex = Index
	
	// Dealing with 1D array input
	var values = Values
	if (!valSize.nCol){
		values = []
		for (var n = 0; n < valSize.nRow; n++){
			values.push([Values[n]])
		}
		// Transforming 1D array in column input
		valSize = size(values)
	}
	var zipValues = list.Zip(values)
	
	
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
	
	if (colIndex > inputSize.nCol) {
        console.error("Index out of bound. Please provide an index smaller than the number of columns in the table.");
        return;
    }
    
    if (colIndex < 0) {
        console.error("Index is negative. Please provide a positive index smaller than the number of columns in the table.");
        return;
    }

	// Adding values to the input table
	for (var n = 0; n < valSize.nCol; n++){
	    var colVal = list.Flatten(zipValues[valSize.nCol - n -1])
	    var nLim = math.Max([list.Length(colVal),inputSize.nRow])
	    for (var i = 0; i < nLim; i++){
	    	if (i >= list.Length(colVal)) {
	    		Out[i].splice(colIndex, 0, null)
	    	}
	    	else if (i < inputSize.nRow) {
	    		Out[i].splice(colIndex, 0, colVal[i])
	    	}
	    	else {
	    		var newRow = nullRow
	    		newRow[colIndex] = colVal[i]
	    		Out.push(newRow)
	    	}
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