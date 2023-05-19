import React from "react";
import { resCancel } from "../utils/api";

function ReservationView({ reservation, index, loadDashboard }) {
  // const reservation_id = reservation.reservation_id

  const cancelHandler = async () => {
    const confirm = window.confirm(
      "Do you want to cancel this reservation?\nThis cannot be undone."
    );
    if (confirm) {
      await resCancel(reservation);
      loadDashboard();
    }
  };

  return (
    <tbody className="table-group-divider">
      <tr key={index}>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
        <td data-reservation-id-status={reservation.reservation_id}>
          {reservation.status}
        </td>
        {reservation.status === "booked" ? (
          <td>
            <button className="btn btn-outline-info btn-sm m-1" type="button">
              <a href={`/reservations/${reservation.reservation_id}/seat`}>
                Seat
              </a>
            </button>
            <button className="btn btn-outline-info btn-sm m-1" type="button">
              <a href={`/reservations/${reservation.reservation_id}/edit`}>
                Edit
              </a>
            </button>
            <button
              className="btn btn-outline-info btn-sm m-1"
              onClick={cancelHandler}
              data-reservation-id-cancel={reservation.reservation_id}
              type="button"
            >
              Cancel
            </button>
          </td>
        ) : null}
      </tr>
    </tbody>
  );
}

export default ReservationView;
