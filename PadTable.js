'use strict';

/**
 * Code block template.
 *
 * This block pads the contents of a 2-dimensional array with null values, to fit into
 * a target set of dimensions. This is useful when pulling data into Excel from Flux,
 * since you can ensure the new data will fill an expected column/row range, and fully 
 * overwrite any existing data within that range.
 */
function run(Table, Rows, Columns) {
	let t = Table;
	
	// needs a check here for rows exceeding target row count, and cropping off those rows

	Table.forEach(function(row, i) {
		// needs a check here for rows longer than the target column count, and cropping off those values
		Table[i] = row.concat(Array(Columns - row.length).fill(null));
	});
	
	let emptyRow = Array(Columns).fill(null);
	let rowPad = Array(Rows - Table.length).fill(emptyRow);
	Table = Table.concat(rowPad);
	
	return {PaddedTable: Table};
}

module.exports = {
    run: run
};
