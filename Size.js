'use strict';

var list = require("flux/list");
var math = require("flux/math");

/**
 * Outputs the size (i.e. number of rows and columns) of an array.
 *
 * @param {2D Array.<*>}   Table      Table.
 *
 * @returns {nRow: Number}}
 * @returns {nCol: Number}}
 * 
 */
 
function run(In) {
	// Error handling
	if ((typeof In) == "string" || !list.Length(In)){
		console.error("The input is not a proper table format. Please input a table.")
		return;
	}
	// Get number of columns
	var nrow = list.Length(In)
	// Get number of rows
	var ncols = []
	for (var i = 0; i < nrow; i++){
		ncols.push(list.Length(In[i]))
	}
	var ncol = math.Max(ncols)
    return {
        nRow: nrow,
        nCol: ncol
    };
}

// Public API
module.exports = {
    run: run
};
