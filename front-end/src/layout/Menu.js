import React from "react";

import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <div>
      <nav className="navbar rounded navbar-expand navbar-transparent bg-transparent">
        <div className="collapse navbar-collapse" id="navbarNav">
          <Link className="navbar-brand text-info" to="/">
            <span>Periodic Tables</span>
          </Link>

          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link font-weight-bold text-info"
                to="/dashboard"
              >
                <span className="oi oi-dashboard m-1" />
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-info font-weight-light"
                to="/search"
              >
                <span className="oi oi-magnifying-glass m-1" />
                Search
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-info font-weight-light"
                to="/reservations/new"
              >
                <span className="oi oi-plus m-1" />
                New Reservation
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-info font-weight-lightx  "
                to="/tables/new"
              >
                <span className="oi oi-layers m-1" />
                New Table
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <hr />
    </div>
  );
}

export default Menu;
