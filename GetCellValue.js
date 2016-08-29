'use strict';

var list = require("flux/list");
var math = require("flux/math");

/**
 * Get the value of the table at a given index.
 *
 * @param {2D Array.<*>}    Table   Table.
 * @param {Array.<Number>}}	Index	Pair of Number type indexes (0-indexing) or alpha-numeric type index (table-indexing).
 *
 * @returns {{Table: []Number|String}}
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

function parseAlphaNumIndex(index) {
	var colIndex = ""
	var rowIndex = ""
	var colIndexOfLast = 0
	var rowIndexOfLast = -1
	var errorFlag = false
	// Looping over the character of the index
	for (var l = 0; l < index.length; l++){
		var getNumIndex = parseInt(index[l])
		// When the character is not an integer
		if (!getNumIndex){
			if (colIndexOfLast > 0 && (l - colIndexOfLast) > 1){
				console.error("Looks like there is something wrong with your Index input. Please make sure to double check. The Index value should be either a String type, in that case alpha-numeric (i.e. 'A1' or 'B5'), or a list of Numbers, 0-indexing (i.e. [0,0] or [1,4]). ")
				errorFlag = true;
			}
			colIndex = colIndex.concat(index[l])
			colIndexOfLast = l
		}
		else{
			if (rowIndexOfLast >= 0 && (l - rowIndexOfLast) > 1){
				console.error("Looks like there is something wrong with your Index input. Please make sure to double check. The Index value should be either a String type, in that case alpha-numeric (i.e. 'A1' or 'B5'), or a list of Numbers, 0-indexing (i.e. [0,0] or [1,4]). ")
				errorFlag = true;
			}
			rowIndex = rowIndex.concat(index[l])
			rowIndexOfLast = l
		}
	}
	if (colIndex == "" || rowIndex == ""){
		console.error("Looks like there is something wrong with your Index input. Please make sure to double check. The Index value should be either a String type, in that case alpha-numeric (i.e. 'A1' or 'B5'), or a list of Numbers, 0-indexing (i.e. [0,0] or [1,4]). ")
		errorFlag = true;
	}
	return{
		"colIndex": colIndex,
		"rowIndex": rowIndex,
		"flag": errorFlag
	};
	
}
	
function readAlphaIndex(alphaIndex){
	var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
	var numIndex = 0;
	var errorFlag = false;
	if (alphaIndex.length == 1){
		var firstLetterIndex = list.IndexOf(alphabet,alphaIndex[0].toLowerCase())
		numIndex = firstLetterIndex.Out
		if (firstLetterIndex.Found == false){
			console.error("Looks like there is something wrong with your Index input. Please make sure to double check. The Index value should be either a String type, in that case alpha-numeric (i.e. 'A1' or 'B5'), or a list of Numbers, 0-indexing (i.e. [0,0] or [1,4]). ")
			errorFlag = true;
		}
	}
	else if (alphaIndex.length == 2){
		var firstLetterIndex = list.IndexOf(alphabet,alphaIndex[0].toLowerCase())
		var secondLetterIndex = list.IndexOf(alphabet,alphaIndex[1].toLowerCase())
		numIndex = (firstLetterIndex.Out + 1)*26 + secondLetterIndex.Out
		if (firstLetterIndex.Found == false || secondLetterIndex.Found == false){
			console.error("Looks like there is something wrong with your Index input. Please make sure to double check. The Index value should be either a String type, in that case alpha-numeric (i.e. 'A1' or 'B5'), or a list of Numbers, 0-indexing (i.e. [0,0] or [1,4]). ")
			errorFlag = true;
		}
	}
	else if (alphaIndex.length == 3){
		var firstLetterIndex = list.IndexOf(alphabet,alphaIndex[0].toLowerCase())
		var secondLetterIndex = list.IndexOf(alphabet,alphaIndex[1].toLowerCase())
		var thirdLetterIndex = list.IndexOf(alphabet,alphaIndex[2].toLowerCase())
		numIndex = (firstLetterIndex.Out + 1)*26*26+ (secondLetterIndex.Out + 1)*26 + thirdLetterIndex.Out
		if (firstLetterIndex.Found == false || secondLetterIndex.Found == false || thirdLetterIndex.Found == false){
			console.error("Looks like there is something wrong with your Index input. Please make sure to double check. The Index value should be either a String type, in that case alpha-numeric (i.e. 'A1' or 'B5'), or a list of Numbers, 0-indexing (i.e. [0,0] or [1,4]). ")
			errorFlag = true;
		}
	}
	else {
		console.error("You're seriously using alphabetical indexing to select a cell at an index further than 18226? Doesn't seem like the best fit in that case... try using 0-indexing!")
		errorFlag = true;
	}
	return{
		"index": numIndex,
		"flag": errorFlag
	};
}

function interpretIndex(Index) {
	var colIndex = 0;
	var rowIndex = 0;
	// Handle the case of an alpha-numeric index input
	if ((typeof Index) == "string"){
		// Parse the index (split row & column indexes)
		var parsedIndex = parseAlphaNumIndex(Index)
		if (parsedIndex.flag == true){						// Exit function if error flag
			return;
		}
		// Interpret the column indexing
		var readColIndex = readAlphaIndex(parsedIndex.colIndex)
		if (readColIndex.flag == true){						// Exit function if error flag
			return;
		}
		colIndex = readColIndex.index
		// Interpret the row indexing
		rowIndex = parseInt(parsedIndex.rowIndex) - 1
	}
	// Handle the case of a numeric index input (list of numbers, 0-indexing)
	else{
		if (list.Length(Index) != 2){
			console.error("Looks like there is something wrong with your Index input. Please make sure to double check. The Index value should be either a String type, in that case alpha-numeric (i.e. 'A1' or 'B5'), or a list of Numbers, 0-indexing (i.e. [0,0] or [1,4]). ")
			return;
		}
		else if ((typeof Index[0]) != "number" || (typeof Index[1]) != "number"){
			console.error("Looks like there is something wrong with your Index input. Please make sure to double check. The Index value should be either a String type, in that case alpha-numeric (i.e.'A1' or 'B5'), or a list of Numbers, 0-indexing (i.e. [0,0] or [1,4]). ")
			return;
		}
		colIndex = Index[1]
		rowIndex = Index[0]
	}
	return {
		"colIndex": colIndex,
		"rowIndex": rowIndex,
		"flag": false
	};
}

function run(Table, Index) {
	var index = interpretIndex(Index)
	if (index.flag == true){
		return;
	}
	var row = Table[index.rowIndex]
	var val = row[index.colIndex]
	console.log(val)
	
	return {
		Value: val
	};
}

module.exports = {
    run: run
};
