import {useTable, useSortBy} from "react-table";
import React, {useMemo} from "react";
import ReactRow from "./ReactRow";
function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    },
        useSortBy
    )
  //            {headerGroup.headers.map(column => { if (column.id === 'Ideology') column.sortType = floatSort;})}
const floatSort = useMemo(() => {
    const sortFunc = (a, b) => {
      const aVal = parseFloat(a.values.Ideology);
      const bVal = parseFloat(b.values.Ideology);
      return aVal < bVal ? -1 : 1;
    };
    return sortFunc;
  });

    // Render the UI for your table
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => { if (column.id === 'Ideology') column.sortType = floatSort;})}
              {headerGroup.headers.map(column => (
                <th  {...column.getHeaderProps(column.getSortByToggleProps())} >{column.render('Header')}
                    <span>
                        {column.isSorted
                        ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                        : ''}
                  </span>
                  </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <ReactRow {...row.getRowProps()} cells={row.cells}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </ReactRow>
            )
          })}
        </tbody>
      </table>
    )
  };

  export default Table;