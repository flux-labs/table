'use strict';

var list = require("flux/list");
var math = require("flux/math");

/**
 * Create a table from a list of value, splitting them based on a number of columns.
 * 
 * @param {Number}     Values	  List of values to put in the table.
 * @param {*}		   nRow		  Number of columns in the table.
 *
 * @returns {{Out: Array.<*>}}
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

function run(Values, nRow) {
    var array = cutList(list.Flatten(Values), nRow)
	var newArray = array[0].map(function(col, i) { 
	  return array.map(function(row) { 
	    return row[i] 
	  })
	});
	return {
        Table: newArray
    };
}

// Public API
module.exports = {
    run: run
};