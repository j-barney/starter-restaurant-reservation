import React, { useState } from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import ReservationForm from "../reservations/ReservationForm"
import useQuery from "../utils/useQuery"
import TableSelector from "../tables/TableSelector"
import TablesForm from "../tables/tablesForm";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const [tableLoader, setTableLoader] = useState()

  const query = useQuery();
  const searchDate = query.get("date");

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations/new">
        <ReservationForm />
      </Route>
      <Route exact={true} path="/tables/new">
        <TablesForm tableLoader={tableLoader} setTableLoader={setTableLoader}/>
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <TableSelector tableLoader={tableLoader} setTableLoader={setTableLoader}/>
      </Route>
      <Route path="/dashboard">
        <Dashboard tableLoader={tableLoader} setTableLoader={setTableLoader} date={searchDate || today()} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
