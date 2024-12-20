import React from "react";

interface TableProps {
  columns: { label: string; field: string }[];
  data: { [key: string]: any }[]; 
  children?: (row: any) => React.ReactNode; 
}

function Table({ columns, data, children }: TableProps) {
  return (
    <div className="flex justify-center px-[2rem]">
      <div className="overflow-x-auto">
        <table
          className="w-[50rem] text-sm text-gray-700 bg-white shadow-lg rounded-lg overflow-hidden"
          style={{ tableLayout: "auto" }}
        >
          <thead className="text-xs text-gray-500 bg-gray-100">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-3 py-2 text-center"
                  style={{ textAlign: "center", whiteSpace: "nowrap" }}
                >
                  {col.label}
                </th>
              ))}
              <th
                scope="col"
                colSpan={2}
                className="px-3 py-2 text-center"
                style={{ textAlign: "center", whiteSpace: "nowrap" }}
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="text-center py-4"
                  style={{ textAlign: "center" }}
                >
                  No matching records found.
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-3 py-2 text-center"
                      style={{
                        textAlign: "center",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {row[col.field]}
                    </td>
                  ))}
                  <td className="py-2 text-center" colSpan={2}>
                    {children && children(row)} {/* Render action buttons */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
