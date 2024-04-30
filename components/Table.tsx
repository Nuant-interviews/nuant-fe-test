import {
  TablePropGetter,
  TableProps,
  HeaderGroup,
  TableBodyPropGetter,
  TableBodyProps,
  Row,
} from "react-table";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { Pokemon } from "../pages";

export function TableComponent({
  getTableProps,
  headerGroups,
  getTableBodyProps,
  rows,
  prepareRow,
}: {
  getTableProps: (
    propGetter?: TablePropGetter<Pokemon> | undefined
  ) => TableProps;
  headerGroups: HeaderGroup<Pokemon>[];
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<Pokemon> | undefined
  ) => TableBodyProps;
  rows: Row<Pokemon>[];
  prepareRow: (row: Row<Pokemon>) => void;
}) {
  return (
    <div
      className="w-full min-w-[30rem] p-4 bg-white rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.03)]"
      data-testid="table-component"
    >
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={`${headerGroup.id}`}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-3 text-start text-xs font-light uppercase cursor-pointer"
                  style={{ width: column.width }}
                  key={column.id}
                >
                  <div className="flex gap-2 items-center">
                    <div className="text-gray-600">
                      {column.render("Header")}
                    </div>
                    <div className="flex flex-col">
                      <FaSortUp
                        className={`sortable-up text-sm translate-y-1/2 ${
                          column.isSorted && !column.isSortedDesc
                            ? "text-red-400"
                            : "text-gray-300"
                        }`}
                      />
                      <FaSortDown
                        className={`sortable-down text-sm -translate-y-1/2 ${
                          column.isSortedDesc ? "text-red-400" : "text-gray-300"
                        }`}
                      />
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                data-testid={"table-row"}
                key={row.id}
                className="hover:bg-gray-100"
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="p-3 text-sm font-normal text-gray-700 first:rounded-l-lg last:rounded-r-lg"
                      key={cell.value}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
