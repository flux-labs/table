'use strict';

var list = require("flux/list");
var math = require("flux/math");

/**
 * Generate a low triangular table of a given value.
 * 
 * @param {Number}     n	      Number of rows and columns in the array.
 * @param {*}		   Value	  Value of each cell of the array.
 * @param {Bool}	   Strict	  Toggle to decide is its a strict lower triangular matrix or not.
 *
 * @returns {{Table: 2D Array.<*>}}
 */

function createArray(N, val, strict) {
    var arr2 = [];
    for (var n = 0; n < N; n++) {
    	var arr1 = []
		for (var m = 0; m < N; m++) {
			if (strict == true) {
				if (n > m){
					arr1.push(val)
				}
			}
			else {
				if (n >= m){
					arr1.push(val)
				}
			}
		}
	   	arr2.push(arr1)
	}
    return arr2;
}

function run(n, Value, Strict) {
	var val = 1
	var strict = false
	if (Value != null){
		val = Value
	}
	if (Strict != null){
		strict = Strict
	}
    return {
        Table: createArray(n, val, strict)
    };
}

// Public API
module.exports = {
    run: run
};