import React from "react";
import TableView from "./TablesView";

function TableList({
  tables,
  tableLoader,
  setTableLoader,
  loadTables,
  loadDashboard,
}) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Table Status</th>
            <th scope="col">Finish Reservation</th>
          </tr>
        </thead>
        {tables.map((table, index) => (
          <TableView
            loadTables={loadTables}
            loadDashboard={loadDashboard}
            table={table}
            index={index}
          />
        ))}
      </table>
    </div>
  );
}

export default TableList;
