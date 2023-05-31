import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div>
      <div className="container-fluid d-flex justify-content-center">
        <div className="d-flex justify-content-center">
          <div className="col">
            <header>
              <Menu />
            </header>
            <div className="col">
              <Routes />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
