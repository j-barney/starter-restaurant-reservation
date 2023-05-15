import React from "react";

function ReservationView({reservation, index}) {
    const reservation_id = reservation.reservation_id

return (
<div>
       <li className="list-group-item" key="index" ><b>Name:</b> {reservation.first_name} {reservation.last_name} — <b>Mobile Number:</b> {reservation.mobile_number} — <b>Reservation Date and Time: </b>{reservation.reservation_date} {reservation.reservation_time} — <b>People: </b>{reservation.people} <a href={`/reservations/${reservation_id}/seat`}>Seat</a></li> 
       </div>

)

}

export default ReservationView
