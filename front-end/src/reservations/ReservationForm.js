import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createReservation, readRes, updateReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { formatAsDate, formatAsTime } from "../utils/date-time";

function ReservationForm() {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [reservation, setReservation] = useState({ ...initialFormState });
  const [errors, setErrors] = useState(null);
  const { reservation_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadReservation() {
      if (reservation_id) {
        const currentRes = await readRes(
          reservation_id,
          abortController.signal
        );
        setReservation(currentRes);
      }
    }
    loadReservation();
    return () => abortController.abort();
  }, [reservation_id]);

  const handleChange = (event) => {
    if (event.target.name === "people") {
      setReservation({
        ...reservation,
        [event.target.name]: Number(event.target.value),
      });
    } else {
      setReservation({
        ...reservation,
        [event.target.name]: event.target.value,
      });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const resDate = formatAsDate(reservation.reservation_date);
    const resTime = formatAsTime(reservation.reservation_time);
    console.log(reservation);
    if (reservation_id) {
      updateReservation(
        {
          ...reservation,
          reservation_time: resTime,
        },
        abortController.signal
      )
        .then(() => {
          history.push(`/dashboard?date=${resDate}`);
        })
        .catch(setErrors);
    } else {
      createReservation(
        {
          ...reservation,
          reservation_id: reservation.reservation_id,
        },
        abortController.signal
      )
        .then(() => {
          history.push(`/dashboard?date=${resDate}`);
        })
        .catch(setErrors);
    }

    if (!errors) {
      setReservation({ ...initialFormState });
    }
    return () => abortController.abort();
  };

  return (
    <div>
      <ErrorAlert error={errors} />
      {!reservation_id ? (
        <h3>Create New Reservation</h3>
      ) : (
        <h3>Edit Reservation</h3>
      )}
      <form className="form-group" name="createReservation">
        <div className="form-outline w-25">
          <label className="my-3" htmlFor="first name">
            First Name
          </label>
          {!reservation_id ? (
            <input
              className="form-control"
              name="first_name"
              type="text"
              id="first_name"
              required={true}
              onChange={handleChange}
              placeholder="First Name"
              value={reservation.first_name}
            />
          ) : (
            <input
              className="form-control"
              name="first_name"
              type="text"
              id="first_name"
              required={true}
              onChange={handleChange}
              value={reservation.first_name}
            />
          )}
          <label className="my-3" htmlFor="last_name">
            Last Name
          </label>
          {!reservation_id ? (
            <input
              className="form-control"
              name="last_name"
              id="last_name"
              type="text"
              required={true}
              onChange={handleChange}
              placeholder="Last Name"
              rows="1"
              value={reservation.last_name}
            />
          ) : (
            <input
              className="form-control"
              name="last_name"
              id="last_name"
              tyoe="text"
              required={true}
              onChange={handleChange}
              value={reservation.last_name}
              rows="1"
            />
          )}

          <label className="my-3" htmlFor="mobile_number">
            Mobile Number
          </label>
          {!reservation_id ? (
            <input
              className="form-control"
              name="mobile_number"
              type="text"
              maxLength="10"
              id="mobile_number"
              required={true}
              onChange={handleChange}
              placeholder="Mobile Number"
              rows="1"
              value={reservation.mobile_number}
            />
          ) : (
            <input
              className="form-control"
              name="mobile_number"
              type="number"
              maxLength="10"
              id="mobile_number"
              required={true}
              onChange={handleChange}
              value={reservation.mobile_number}
              rows="1"
            />
          )}

          <label className="my-3" htmlFor="reservation_date">
            Reservation Date
          </label>
          {!reservation_id ? (
            <input
              className="form-control"
              name="reservation_date"
              type="date"
              id="reservation_date"
              required={true}
              onChange={handleChange}
              placeholder="Reservation Date"
              rows="1"
              value={reservation.reservation_date}
            />
          ) : (
            <input
              className="form-control"
              name="reservation_date"
              id="reservation_date"
              type="date"
              required={true}
              onChange={handleChange}
              value={reservation.reservation_date}
              rows="1"
            />
          )}

          <label className="my-3" htmlFor="reservation_time">
            Reservation Time
          </label>
          {!reservation_id ? (
            <input
              className="form-control"
              name="reservation_time"
              type="time"
              id="reservation_time"
              required={true}
              onChange={handleChange}
              rows="1"
              value={reservation.reservation_time}
            />
          ) : (
            <input
              className="form-control"
              name="reservation_time"
              id="reservation_time"
              type="time"
              required={true}
              onChange={handleChange}
              value={reservation.reservation_time}
              rows="1"
            />
          )}

          <label className="my-3" htmlFor="people">
            People
          </label>
          {!reservation_id ? (
            <input
              className="form-control"
              name="people"
              type="number"
              id="people"
              required={true}
              onChange={handleChange}
              placeholder="Party Size"
              rows="1"
              value={reservation.people}
            />
          ) : (
            <input
              className="form-control"
              name="people"
              id="people"
              type="number"
              required={true}
              onChange={handleChange}
              value={reservation.people}
              rows="1"
            />
          )}
        </div>
        <div className="container">
          <div className="row">
            <div className="flex btn-group">
              <div className="my-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={history.goBack}
                >
                  Cancel
                </button>
              </div>
              <div className="my-3 px-2">
                <button
                  className="btn btn-outline-info"
                  onClick={submitHandler}
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
