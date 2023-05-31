import React from "react";
import ReservationView from "./ReservationView";

function ReservationList({ reservations, loadDashboard }) {
  return (
    <div>
      <div class="table-responsive d-flex">
        <table className="table-sm mb-5 table">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">People</th>
              <th scope="col">Status</th>
              <th scopt="col">Seating</th>
            </tr>
          </thead>
          {reservations.map((reservation, index) => (
            <ReservationView
              index={index}
              reservation={reservation}
              loadDashboard={loadDashboard}
            />
          ))}
        </table>
      </div>
    </div>
  );
}

export default ReservationList;
