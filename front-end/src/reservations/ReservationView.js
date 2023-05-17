import React from "react";

function ReservationView({ reservation, index }) {
  // const reservation_id = reservation.reservation_id
  return (
    <div>
      <tbody className="table-group-divider">
        <tr key={index}>
          <td>{reservation.first_name}</td>
          <td>{reservation.last_name}</td>
          <td>{reservation.mobile_number}</td>
          <td>{reservation.reservation_date}</td>
          <td>{reservation.reservation_time}</td>
          <td>{reservation.people}</td>
          <td>
            <button type="submit">
              <a href={`/reservations/${reservation.reservation_id}/seat`}>
                Seat
              </a>
            </button>
          </td>
        </tr>
      </tbody>
    </div>
  );
}

export default ReservationView;
