import React from "react";
import { finishReservation } from "../utils/api";

function TableView({ loadDashboard, table, index, loadTables }) {
  const deleteHandler = async () => {
    const confirm = window.confirm(
      "Is this table ready to seat new guests?\nThis cannot be undone."
    );
    if (confirm) {
      try {
        await finishReservation(table.table_id, table.reservation_id);
        loadDashboard();
        loadTables();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <tbody className="table-group-divider">
      <tr key={index}>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td data-table-id-status={table.table_id}>
          {table.reservation_id !== null ? "Occupied" : "Free"}
        </td>
        {table.reservation_id !== null ? (
          <td>
            <button
              data-table-id-finish={table.table_id}
              type="submit"
              onClick={deleteHandler}
            >
              Finish
            </button>
          </td>
        ) : null}
      </tr>
    </tbody>
  );
}

export default TableView;
