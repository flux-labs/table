'use strict';

var list = require("flux/list");
var math = require("flux/math");

/**
 * Sets the values of a range of cells in the table.
 *
 * @param {2D Array.<*>}   			Table   	List of lists.
 * @param {Array.<Number>}|String}	TopIndex	Pair of Number type indexes (0-indexing) or alpha-numeric type index (table-indexing).
 * @param {Array.<Number>}|String}	BotIndex	Pair of Number type indexes (0-indexing) or alpha-numeric type index (table-indexing).
 * @param {[][]*}					Value		Array of replacement values.
 *
 * @returns {2D Array.<*>: []Number}
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
		console.error("Looks like there is something wrong with your indexes. Please make sure to double check. The Index value should be either a String type, in that case alpha-numeric (i.e. 'A1' or 'B5'), or a list of Numbers, 0-indexing (i.e. [0,0] or [1,4]). ")
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

function interpretIndexInput(index, nColLim, nRowLim){
	var rowIndex = 0
	var colIndex = 0
	// Handle the case of an alpha-numeric index input
	if ((typeof index) == "string"){
		// Parse the index (split row & column indexes)
		var parsedIndex = parseAlphaNumIndex(index)
		if (parsedIndex.flag == true){						// Exit function if error flag
			return {
				"flag": true
			};
		}
		// Interpret the column indexing
		var readColIndex = readAlphaIndex(parsedIndex.colIndex)
		if (readColIndex.flag == true){						// Exit function if error flag
			return {
				"flag": true
			};
		}
		colIndex = readColIndex.index
		// Interpret the row indexing
		rowIndex = parseInt(parsedIndex.rowIndex) - 1
	}
	// Handle the case of a numeric index input (list of numbers, 0-indexing)
	else{
		if (list.Length(index) != 2){
			console.error("Looks like there is something wrong with your indexes. Please make sure to double check. The Index value should be either a String type, in that case alpha-numeric (i.e. 'A1' or 'B5'), or a list of Numbers, 0-indexing (i.e. [0,0] or [1,4]). ")
			return {
				"flag": true
			};
		}
		else if ((typeof index[0]) != "number" || (typeof index[1]) != "number"){
			console.error("Looks like there is something wrong with your indexes. Please make sure to double check. The Index value should be either a String type, in that case alpha-numeric (i.e.'A1' or 'B5'), or a list of Numbers, 0-indexing (i.e. [0,0] or [1,4]). ")
			return {
				"flag": true
			};
		}
		colIndex = index[1]
		rowIndex = index[0]
	}
	if (rowIndex >= nRowLim || rowIndex < 0 || colIndex >= nColLim || colIndex < 0){
		console.error("The Index input is out of bound or negative. Please provide a positive index within the bound of the table.")
		return {
			"flag": true
		};
	}
	return{
		"colIndex": colIndex,
		"rowIndex": rowIndex,
		"flag": false
	};
}

function run(Table, topIndex, botIndex, Values) {
	var tableSize = size(Table)
	var topIndexInterp = interpretIndexInput(topIndex, tableSize.nCol, tableSize.nRow)
	var botIndexInterp = interpretIndexInput(botIndex, tableSize.nCol, tableSize.nRow)
	
	if (topIndexInterp.flag || botIndexInterp.flag){
		return;
	}
	
	var rangeNRow = Math.abs(botIndexInterp.rowIndex - topIndexInterp.rowIndex) + 1
	var rangeNCol = Math.abs(botIndexInterp.colIndex - topIndexInterp.colIndex) + 1
	var valSize = size(Values)
	if (rangeNRow != valSize.nCol || rangeNCol != valSize.nRow){
		console.error("The Range selected and the Values don't have the same size. Please make sure that the inputs are consistent.")
		return;
	}
	var Out = Table
	for (var r = 0; r < rangeNRow; r ++){
		for (var c = 0; c < rangeNCol; c ++){
			Out[topIndexInterp.rowIndex + r][topIndexInterp.colIndex + c] = Values[r][c]
		}
	}
	
	return {
		Table: Out
	};
}

module.exports = {
    run: run
};
