'use strict';

var list = require("flux/list");
var math = require("flux/math");

/**
 * Searches for a value in a given column of a table, and then returns a value in the same row from a column you specify in the table.
 * 
 * @param {2D Array.<*>}  			Table      			Table.
 * @param {*}  						LookupValue			Value to search.
 * @param {Number|String}     		LookupColIndex   	Col index to search the value in.
 * @param {Number|String}			ReturnColIndex		Col index to return the value from.
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

function interpretIndex(Index, tableSize){
	var colIndex = Index
	
	// Index error handling
	if ((typeof Index) == "string"){
		var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
		// Checking that the characters of the index are numeric
		var getNumIndex = parseInt(Index)
		if (getNumIndex){
			console.error("For column selection with table-indexing, please input alphabetical values.")
			return {"flag": true};
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
			console.error("Seriously?! Your table has MORE than 18278 columns?! Maybe table-indexing isn't the most appropriate in that case... try using 0-indexing!")
			return {"flag": true};
		}
	}
	
    if (colIndex >= tableSize.nCol) {
        console.error("Index out of bound. Please provide an index smaller than the number of columns in the table.");
        return {"flag": true};
    }
    
    if (colIndex < 0) {
        console.error("Index is negative. Please provide a positive index smaller than the number of columns in the table.");
        return {"flag": true};
    }
    
    return {
    	"index": colIndex,
    	"flag": false
    }
}

function run(Table, LookupValue, LookupColIndex, ReturnColIndex) {
	if (Table == null || LookupValue == null || ReturnColIndex == null){
		console.error("Please provide all mandatory inputs: Table, LookupValue and ReturnRowIndex.")
		return;
	}
	
	var inputSize = size(Table)
	var lookupColIndex = 0
	if (LookupColIndex != null){
		lookupColIndex = LookupColIndex
	}
	var lookupColI = interpretIndex(lookupColIndex, size(Table))
	if (lookupColI.flag == true){
		return;
	}
	var returnColI = interpretIndex(ReturnColIndex, size(Table))
	if (returnColI.flag == true){
		return;
	}
    
    // Get columns with values to search and to return
    var searchCol = []
	var returnCol = []
    for (var i = 0; i < inputSize.nRow; i++){
    	if (Table[i][lookupColI.index] != undefined){
	    	searchCol.push(Table[i][lookupColI.index])
    	}
    	if (Table[i][returnColI.index] != undefined){
	    	returnCol.push(Table[i][returnColI.index])
    	}
    	if (Table[i][lookupColI.index] == undefined && Table[i][returnColI.index] == undefined){
	    	break
    	}
    }
    
    // Get index of the lookup value requested
    var valIndex = list.IndexOf(searchCol, LookupValue)
    if (valIndex.Found == false){
    	console.error('Input LookupValue is not valid, please provide a valid value to lookup.');
    	return;
    }
	// Returning the column requested
    return {
        Value: returnCol[valIndex.Out]
    };
}

// Public API
module.exports = {
    run: run
};
