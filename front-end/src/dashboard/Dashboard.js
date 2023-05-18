import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "../reservations/ReservationsList";
import TableList from "../tables/TableList";
import { next, previous, today } from "../utils/date-time";
import { useHistory } from "react-router-dom";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setTableLoader, tableLoader }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const history = useHistory();

  useEffect(loadDashboard, [date, tableLoader]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  useEffect(loadTables, []);
  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables);
    return () => abortController.abort();
  }

  function previousBtnHandler(date) {
    const previousDay = previous(date);
    history.push(`/dashboard?date=${previousDay}`);
  }

  function nextBtnHandler(date) {
    const nextDay = next(date);
    history.push(`/dashboard?date=${nextDay}`);
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <ReservationsList
        loadDashboard={loadDashboard}
        reservations={reservations}
      />
      <TableList
        loadDashboard={loadDashboard}
        tables={tables}
        loadTables={loadTables}
      />
      <button
        type="button"
        onClick={() => previousBtnHandler(date)}
        className="btn btn-outline-info btn-sm m-1"
      >
        Previous Day
      </button>
      <button
        type="button"
        className="btn btn-outline-info btn-sm m-1"
        onClick={() => history.push(`/dashboard?date=${today()}`)}
      >
        Today
      </button>
      <button
        type="button"
        onClick={() => nextBtnHandler(date)}
        className="btn btn-outline-info btn-sm m-1"
      >
        Next Day
      </button>
    </main>
  );
}

export default Dashboard;
