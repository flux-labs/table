# table
A collection of blocks for table manipulation operations.

### `Clean`
Clean a table from empty rows or columns.
#### Inputs:
* `Table`: Table to trim.

#### Outputs:
*`Table`: Table


### `CreateTableByColSplit`
Create a table from a list of value, splitting them based on a number of columns.
#### Inputs:
* `Values`: List of values to put in the table.
* `nRow`: Number of columns in the table.

#### Outputs:
*`Table`: Table


### `CreateTableByRowSplit`
Create a table from a list of value, splitting them based on a number of rows.
#### Inputs:
* `Values`: List of values to put in the table.
* `nRow`: Number of rows in the table.

#### Outputs:
*`Table`: Table


### `DeleteColumn`
Deletes n number of columns at index i, n =DeleteCount, i = index. Index input reads Number type for 0-indexing, String type for table-indexing.
#### Inputs:
* `Table`: Table.
* `Index`: Index to which rows will be deleted. Number type for 0-indexing, String type for table-indexing.
* `DeleteCount`: Number of columns to delete.

#### Outputs:
*`Table`: Updated table


### `DeleteRow`
Deletes n number of rows at index i, n =DeleteCount, i = index. Index input reads Number type for 0-indexing, String type for table-indexing.
#### Inputs:
* `Table`: Table.
* `Index`: Index to which rows will be deleted. Number type for 0-indexing, String type for table-indexing.
* `DeleteCount`: Number of rows to delete.

#### Outputs:
*`Table`: Updated table


### `GenerateRandomTable`
Generate a low triangular table of a given value.
#### Inputs:
* `n`: Number of rows and columns in the array.
* `Value`: Value of each cell of the array.
* `Strict`: Toggle to decide is its a strict lower triangular matrix or not.

#### Outputs:
*`Table`: Table


### `GenerateRandomTable`
Generate a table of random values.
#### Inputs:
* `nRow`: Number of rows in the array.
* `nCol`: Number of columns in the array.

#### Outputs:
*`Table`: Table


### `GenerateTableOfValue`
Generate a table of values.
#### Inputs:
* `nRow`: Number of rows in the array.
* `nCol`: Number of columns in the array.
* `Value`: Value of each cell of the array.

#### Outputs:
*`Table`: Table


### `GetCellValue`
Get the value of the table at a given index.
#### Inputs:
* `Table`: Table
* `Index`: Pair of Number type indexes (0-indexing) or alpha-numeric type index (table-indexing).

#### Outputs:
*`Value`: Object


### `GetColumn`
Retrieves the column of a table at a specific index. As for the index input use Number type for 0-indexing, String type for table-indexing.
#### Inputs:
* `Table`: Table
* `Index`: Index at which to retrieve the column. Number for 0-indexing, String for table-indexing

#### Outputs:
*`Table`: Column


### `GetColumnByColumnName`
Get column based on column name.
#### Inputs:
* `Table`: Table
* `Name`: List
* `Index`: Index of the row of column names to search from.

#### Outputs:
*`Table`: Column


### `GetIndexOfItem`
Get the index of a given item.
#### Inputs:
* `Table`: Table
* `Item`: Item to search for
* `zeroIndexing`: Toggle to choose whether or not to output the results as 0-indexes.

#### Outputs:
*`Table`: Column


### `GetRow`
Retrieves the row of a table at a specific index. As for the index input use Number type for 0-indexing, String type for table-indexing.
#### Inputs:
* `Table`: Table
* `Index`: Index at which to retrieve the row. Number for 0-indexing, String for table-indexing

#### Outputs:
*`Table`: Row


### `GetRowByRowName`
Get row based on row name.
#### Inputs:
* `Table`: Table
* `Name`: List
* `Index`: Index of the column of row names to search from.

#### Outputs:
*`Table`: Row


### `H-Lookup`
Searches for a value in a given row of a table, and then returns a value in the same column from a row you specify in the table.
#### Inputs:
* `Table`: Table
* `LookupValue`: Value to search
* `LookupRowIndex`: Row index to search the value in
* `ReturnRowIndex`: Row index to return the value from

#### Outputs:
*`Out`: Found value.


### `Insert Column`
Insert values at a certain column index. Index input reads Number type for 0-indexing, String type for table-indexing.
#### Inputs:
* `Table`: Table
* `Index`: Index of insertion. Number type for 0-indexing, String type for table-indexing.
* `Values`: Values to insert

#### Outputs:
*`Table`: Updated array.


### `Insert Row`
Insert values at a certain row index. Index input reads Number type for 0-indexing, String type for table-indexing.
#### Inputs:
* `Table`: Table
* `Index`: Index of insertion. Number type for 0-indexing, String type for table-indexing.
* `Values`: Values to insert

#### Outputs:
*`Table`: Updated array.


### `Merge`
Merges 2 tables
#### Inputs:
* `Table`: First table
* `Table`: Second table

#### Outputs:
*`Table`: Newly create array.


### `SetCellValue`
Sets the value of a cell in the table.
#### Inputs:
* `Table`: Table
* `Index`: Pair of Number type indexes (0-indexing) or alpha-numeric type index (table-indexing).
* `Value`: Replacement value.

#### Outputs:
*`Table`: New array with set value.


### `SetRangeValue`
Sets the values of a range of cells in the table.
#### Inputs:
* `Table`: Table
* `TopIndex`: Pair of Number type indexes (0-indexing) or alpha-numeric type index (table-indexing).
* `BotIndex`: Pair of Number type indexes (0-indexing) or alpha-numeric type index (table-indexing).
* `Value`: Array of replacement values.

#### Outputs:
*`Table`: New array with set values.


### `Size`
Outputs the size (i.e. number of rows and columns) of an array.
#### Inputs:
* `Table`: Table

#### Outputs:
*`nRow`: Number of Rows
*`nCol`: Number of Columns


### `SortByColumn`
Sorts a table based on the values of a given column. Sorting is ascending if Ascending input is true, descending if false.
#### Inputs:
* `Table`: Table
* `Index`: Value to search
* `Ascending`: Index of row to sort table with

#### Outputs:
*`Table`: Sorted table.


### `SortByRow`
Sorts a table based on the values of a given row. Sorting is ascending if Ascending input is true, descending if false.
#### Inputs:
* `Table`: Table
* `Index`: Value to search
* `Ascending`: Index of row to sort table with

#### Outputs:
*`Table`: Sorted table.


### `V-Lookup`
Searches for a value in a given column of a table, and then returns a value in the same row from a column you specify in the table.
#### Inputs:
* `Table`: Table
* `LookupValue`: Value to search
* `LookupColIndex`: Col index to search the value in
* `ReturnColIndex`: Col index to return the value from

#### Outputs:
*`Out`: Found value.
