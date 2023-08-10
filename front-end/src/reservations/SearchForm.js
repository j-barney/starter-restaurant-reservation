import React, { useState } from "react";
import { searchNumber } from "../utils/api";
import ReservationsList from "./ReservationsList";

function SearchForm() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [errors, setErrors] = useState(null);

  //sets the nunmber state to whatever the value entered is
  const handleChange = (event) => {
    setMobileNumber(event.target.value);
  };
  //sends phone number to search functionality
  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    searchNumber(mobileNumber, abortController.signal)
      .then(setReservations)
      .catch(setErrors);

    if (!errors) {
      setReservations([]);
    }

    return () => abortController.abort();
  };

  return (
    <div>
      Search for Reservations
      <form
        className="form-group"
        onSubmit={submitHandler}
        name="reservation search"
      >
        <div className="form-outline w-25">
          <input
            className="form-control"
            name="mobile_number"
            type="text"
            id="mobile_number"
            required={true}
            maxLength="10"
            onChange={handleChange}
            placeholder="Enter a mobile number"
          />
        </div>
        <div className="container">
          <div className="row">
            <div className="my-3 px-2">
              <button className="btn btn-outline-info btn-sm m-1" type="submit">
                Find
              </button>
            </div>
          </div>
        </div>
      </form>
      {reservations.length > 0 ? (
        <div>
          <h3>Search Results</h3>
          <ReservationsList reservations={reservations} />
        </div>
      ) : (
        <div>No reservations found</div>
      )}
    </div>
  );
}

export default SearchForm;
