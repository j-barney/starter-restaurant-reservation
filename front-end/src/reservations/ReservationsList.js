import React from "react";
import ReservationView from "./ReservationView"

function DeckList({ reservations }) {
  return (
    <div>
      <ul className="list-group">
       { reservations.map((reservation, index) => 
       <ReservationView reservation={reservation} index={index} />
       )}
      </ul>
    </div>
  )
}

export default DeckList;