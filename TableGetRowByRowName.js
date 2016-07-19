'use strict';

var list = require("flux/list");
var math = require("flux/math");

/**
 * Get row based on row name.
 * 
 * @param {2D Array.<*>}  	In      Table.
 * @param {*}  				Name	List.
 * @param {Number}     		Index   Index of the column of row names.
 *
 * @returns {{Row: 2D Array.<*>}}
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

function run(In, Name, ColIndex) {
	var inputSize = size(In)
	var nameIndex = 0
	// Set default index to 0 unless stated otherwise
	if (ColIndex != 0 && ColIndex != null){
		nameIndex = ColIndex; 
	}
	
	if ((typeof ColIndex) == "string"){
		var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
		// Checking that the characters of the index are numeric
		var getNumIndex = parseInt(ColIndex)
		if (getNumIndex){
			console.error("For column selection with table-indexing, please input alphabetical values.")
			return;
		}
		if (ColIndex.length == 1){
			var firstLetterIndex = list.IndexOf(alphabet,ColIndex[0].toLowerCase())
			nameIndex = firstLetterIndex.Out
		}
		else if (ColIndex.length == 2){
			var firstLetterIndex = list.IndexOf(alphabet,ColIndex[0].toLowerCase())
			var secondLetterIndex = list.IndexOf(alphabet,ColIndex[1].toLowerCase())
			nameIndex = (firstLetterIndex.Out + 1)*26 + secondLetterIndex.Out
		}
		else if (ColIndex.length == 3){
			var firstLetterIndex = list.IndexOf(alphabet,ColIndex[0].toLowerCase())
			var secondLetterIndex = list.IndexOf(alphabet,ColIndex[1].toLowerCase())
			var thirdLetterIndex = list.IndexOf(alphabet,ColIndex[2].toLowerCase())
			nameIndex = (firstLetterIndex.Out + 1)*26*26+ (secondLetterIndex.Out + 1)*26 + thirdLetterIndex.Out
		}
		else {
			console.error("Your table has seriously more than 18226 columns? Maybe table-indexing isn't the most appropriate in that case... try using 0-indexing!")
			return;
		}
	}

	// Error handling
    if (nameIndex >= inputSize.nRow) {
        console.error("Index of row(s) to remove is out of bound. Please provide indexes smaller than the number of rows in the table.");
        return;
    }
    if (nameIndex < 0) {
        console.error("Some index of row(s) to remove is negative. Please provide positive indexes smaller than the number of rows in the table.");
        return;
    }
    
    // Get list of row names
    var names = []
    for (var i = 0; i < inputSize.nRow; i++){
    	if (In[i][nameIndex] != undefined){
	    	names.push(In[i][nameIndex])
    	}
    	else {
    		break
    	}
    }
    // Get index of the row name requested
    var rowIndex = list.IndexOf(names, Name)
    if (rowIndex.Found == false){
    	console.error('Input Name is not valid, please provide valid row Name');
    	return;
    }
	
	// Returning the row requested
    return {
        Row: [In[rowIndex.Out]]
    };
}

// Public API
module.exports = {
    run: run
};
