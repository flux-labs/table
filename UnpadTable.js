'use strict';

var _ = require('lodash');

/**
 * Code block template.
 *
 * This block removes any excess padding from a 2-dimensional array, cropping off any rows
 * only consisting of nulls, as well as any nulls at the end of each row. It should not crop
 * any nulls left of the first non-null value from the right. This is useful when data from
 * Excel includes any padded null values included in its selection range.
 */
function run(PaddedTable) {

	let rowLengths = PaddedTable.map(function(row) {
		return _.findLastIndex(row, function(x) {return x !== null;}) + 1;
	});
	
	let rowCount = _.findLastIndex(rowLengths, function(x) {return x !== 0;}) + 1;
	let newTable = [];
	
	for (let i=0; i<rowCount; i++) {
		newTable.push(_.first(PaddedTable[i], rowLengths[i]));
	}
	return {Table: newTable};
}

module.exports = {
    run: run
};
