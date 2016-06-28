'use strict';

var _ = require('lodash');

/**
 * Code block template.
 *
 * This block removes empty rows from the end of a 2-dimensional array, cropping off any rows
 * only consisting of nulls and/or "".
 */
function run(PaddedTable) {
	var isRowEmpty;
	
	for (let rows = PaddedTable.length; rows > 0; rows--) {
		isRowEmpty = _.every( PaddedTable[rows-1], cell => cell === null || cell === "");
		if(!isRowEmpty) break;
	}
	
	return {
		Table: _.first(PaddedTable, rows)
	};
}

module.exports = {
    run: run
};