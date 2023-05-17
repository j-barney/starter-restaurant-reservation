import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom";
import { seatTable, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function TableSelector({ tableLoader, setTableLoader }) {
  const { reservation_id } = useParams();
  const [selectedTable, setSelectedTable] = useState();
  const [tableErrors, setTableErrors] = useState(null);
  const [tables, setTables] = useState([]);
  const history = useHistory();
  console.log(reservation_id);
  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    async function loadTables() {
      if (reservation_id) {
        const tablesList = await listTables();
        setTables(() => tablesList);
      }
    }
    loadTables();
  }, [reservation_id]);

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    seatTable(reservation_id, selectedTable)
      .then(() => {
        history.push(`/dashboard`);
      })
      .catch(setTableErrors);

    if (!tableErrors) {
      setSelectedTable("");
    }
    setTableLoader(!tableLoader);
    return () => abortController.abort();
  };

  const handleChange = ({ target }) => {
    setSelectedTable(target.value);
  };

  const tableMap = tables.map((table) => {
    return (
      <option key={table.table_id} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  return (
    <div className="container">
      {tableErrors ? <ErrorAlert error={tableErrors} /> : null}
      <select
        className="custom-select mr-sm-2"
        aria-label="table selector"
        required
        name="table_id"
        onChange={handleChange}
      >
        <option defaultValue={0}>Choose a table</option>

        {tableMap}
      </select>
      <button type="submit" onClick={submitHandler}>
        Submit
      </button>
      <button onClick={goBack}>Cancel</button>
    </div>
  );
}

export default TableSelector;
