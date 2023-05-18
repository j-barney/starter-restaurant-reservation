import React from "react";
import ReservationView from "./ReservationView";

function ReservationList({ reservations }) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Reservation Date</th>
            <th scope="col">Reservation Time</th>
            <th scope="col">Number of People</th>
            <th scope="col">Reservation Status</th>
            <th scopt="col">Seating</th>
          </tr>
        </thead>
        {reservations.map((reservation, index) => (
          <ReservationView index={index} reservation={reservation} />
        ))}
      </table>
    </div>
  );
}

export default ReservationList;
