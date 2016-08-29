'use strict';

var list = require("flux/list");
var math = require("flux/math");

/**
 * Index of Item.
 *
 * @param {2D Array.<*>}   	Table      		Table.
 * @param {*}      			Item   			Item to search for.
 * @param {Boolean}			zeroIndexing	Toggle to choose whether or not to output the results as 0-indexes.
 *
 * @returns {{Index: []Number|String, Found: Boolean}}
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

function convertIndex(indexes){
	var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
	var rowIndexNum = indexes[0]
	var colIndexNum = indexes[1]
	var colIndexAlpha = ""
	var errorFlag = false
	if (colIndexNum < 26){
		colIndexAlpha = colIndexAlpha = alphabet[colIndexNum]
	}
	else if (colIndexNum < 27*26){
		colIndexAlpha = colIndexAlpha.concat(alphabet[Math.floor(colIndexNum/26)-1])
		colIndexAlpha = colIndexAlpha.concat(alphabet[colIndexNum%26])
	}
	else if (colIndexNum < (27*26*26+26)){
		colIndexAlpha = colIndexAlpha.concat(alphabet[Math.floor((Math.floor(colIndexNum/26)-1)/26)-1])
		colIndexAlpha = colIndexAlpha.concat(alphabet[Math.floor(colIndexNum/26) - 26*Math.floor((Math.floor(colIndexNum/26)-1)/26) - 1])
		colIndexAlpha = colIndexAlpha.concat(alphabet[colIndexNum%26])
	}
	else{
		console.error("You're seriously using alphabetical indexing to select a cell at an index further than 18226? Doesn't seem like the best fit in that case... try using 0-indexing!")
		errorFlag = true;
	}
	var alphaIndex = (colIndexAlpha.toUpperCase()).concat(rowIndexNum + 1)
	return{
		"alphaIndex": alphaIndex,
		"flag": errorFlag
	};
}


function run(Table, Item, zeroIndexing) {
	var inputSize = size(Table)
	var indexes = []
	var found = false
	
	for (var n = 0; n < inputSize.nRow; n++){
    	var row = Table[n]
    	var rowIndex = list.IndexOf(row, Item)
    	if (rowIndex.Found == true) {
    		indexes.push([n,rowIndex.Out])
    	}
	}

	if (list.Length(indexes) == 0) {
		return{
			Index: null,
			Found: false
		};
	}
	if (zeroIndexing == false){
		var alphaIndexes = []
		for (var i = 0; i < list.Length(indexes); i ++){
			var convertedInd = convertIndex(indexes[i])
			if (convertedInd.flag == true){
				return;
			}
			alphaIndexes.push(convertedInd.alphaIndex)
		}
		indexes = alphaIndexes
	}

	return {
		Index: indexes,
		Found: true
	};
}

module.exports = {
    run: run
};
