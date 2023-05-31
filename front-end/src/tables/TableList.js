import React from "react";
import TableView from "./TablesView";

function TableList({ tables, loadTables, loadDashboard }) {
  return (
    <div className="card w-75">
      <div className="table-responsive pl-3">
        <table className="table table-m">
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
    </div>
  );
}

export default TableList;
