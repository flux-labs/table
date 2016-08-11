'use strict';

var list = require("flux/list");
var math = require("flux/math");

/**
 * Create a table from a list of value, splitting them based on a number of columns.
 * 
 * @param {Number}     Values	  List of values to put in the table.
 * @param {*}		   nCol		  Number of columns in the table.
 *
 * @returns {{Table: 2D Array.<*>}}
 */

function cutList(val, n) {
	var listLength = list.Length(val)
	var temp = []
	var out = []
	var c = 1
	while (c <= listLength){
		temp.push(val[c-1])
		if (c%n == 0 && c != listLength){
			out.push(temp)
			temp = []
		}
		c++
	}
	out.push(temp)
    return out;
}

function run(Values, nCol) {
    return {
        Table: cutList(list.Flatten(Values), nCol)
    };
}

// Public API
module.exports = {
    run: run
};