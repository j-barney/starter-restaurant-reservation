import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function TablesForm({ tableLoader, setTableLoader }) {
  const initialFormState = {
    table_name: "",
    capacity: "",
  };

  const [table, setTable] = useState({ ...initialFormState });
  const [errors, setErrors] = useState(null);
  const { tableId } = useParams();
  const history = useHistory();
  //handles changes to the form
  const handleChange = (event) => {
    if (event.target.name === "capacity") {
      setTable({
        ...table,
        [event.target.name]: Number(event.target.value),
      });
    } else {
      setTable({
        ...table,
        [event.target.name]: event.target.value,
      });
    }
  };
  //adds new table to DB
  function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();

    createTable(
      {
        ...table,
      },
      abortController.signal
    )
      .then(() => {
        history.push(`/dashboard`);
      })
      .catch(setErrors);

    if (!errors) {
      setTable({ ...initialFormState });
      setTableLoader(!tableLoader);
    }
    return () => abortController.abort();
  }

  return (
    <div>
      <ErrorAlert error={errors} />
      {!tableId ? <h3>Create New Table</h3> : <h3>Edit Table</h3>}
      <form className="form-group" name="createTable">
        <div class="form-outline w-25">
          <label className="my-3" htmlFor="first name">
            Table Name
          </label>
          {!tableId ? (
            <input
              className="form-control"
              name="table_name"
              type="text"
              id="table_name"
              required={true}
              onChange={handleChange}
              placeholder="Table Name"
            />
          ) : (
            <input
              className="form-control"
              name="table_name"
              type="text"
              id="table_name"
              required={true}
              onChange={handleChange}
              // value={}
            />
          )}
          <label className="my-3" htmlFor="capacity">
            Capacity
          </label>
          {!tableId ? (
            <input
              className="form-control"
              name="capacity"
              id="capacity"
              type="text"
              required={true}
              onChange={handleChange}
              placeholder="Capacity"
              rows="1"
            />
          ) : (
            <input
              className="form-control"
              name="capacity"
              id="capacity"
              tyoe="text"
              required={true}
              onChange={handleChange}
              // value={last_name}
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

export default TablesForm;
