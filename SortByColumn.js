'use strict';

var list = require("flux/list");
var math = require("flux/math");

/**
 * Sorts a table based on the values of a given column. Sorting is ascending is Ascending input is true, descending if false.
 * 
 * @param {2D Array.<*>}  		Table       Table.
 * @param {Number|String}     	Index       Index of insertion. Number type for 0-indexing, String type for table-indexing.
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

function getColumn(In, Index) {
    var Out = []
	var inputSize = size(In)
	var colIndex = Index
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
			console.error("Seriously?! Your table has MORE than 18226 columns?! Maybe table-indexing isn't the most appropriate in that case... try using 0-indexing!")
			return {"flag": true};
		}
	}
	
    if (colIndex >= inputSize.nCol) {
        console.error("Index out of bound. Please provide an index smaller than the number of columns in the table.");
        return {"flag": true};
    }
    
    if (colIndex < 0) {
        console.error("Index is negative. Please provide a positive index smaller than the number of columns in the table.");
        return {"flag": true};
    }
    
    for (var i = 0; i < inputSize.nRow; i++){
    	if (In[i][colIndex] != undefined){
	    	Out.push([In[i][colIndex]])
    	}
    	else {
    		break
    	}
    }
    
    return {
        "column": Out,
        "flag": false
    };
}

function run(Table, ColIndex, Ascending) {
	if (Table == null){
		console.error ("Please input Table to sort.")
		return;
	}
	// Default values for ColIndex and Acsending
	var colIndex = 0
	if (ColIndex != null){
		colIndex = ColIndex
	}
	var ascend = true
	if (Ascending != null){
		ascend = Ascending
	}
	// Sort Column
	var sortColumn = getColumn(Table, colIndex)
	if (sortColumn.flag == true){
		return;
	}
	var listToOrder = list.Flatten(sortColumn.column)
	var order = list.Sort(listToOrder)
	var nRow = list.Length(order.Permutation)
	var indexOrder = order.Permutation
	var Out = []
	if (ascend){
		for (var i = 0; i < nRow; i++){
			Out.push(Table[indexOrder[i]])
		}
	}
	else {
		for (var i = 0; i < nRow; i++){
			Out.push(Table[indexOrder[nRow - i - 1]])
		}
	}
	
	return {
		Table: Out
	};
}

module.exports = {
    run: run
};
