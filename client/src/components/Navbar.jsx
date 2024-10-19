import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = ({ setSelectedState, selectedState, selectedStateId }) => {
  const { logout, getCookie } = useContext(UserContext);
  const location = useLocation();

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <span
            style={{
              marginLeft: "1.0vw",
              background:
                "linear-gradient(to right, rgb(202 255 250), rgb(144 215 218))",
              WebkitBackgroundClip: "text" /* for safari and chrome */,
              WebkitTextFillColor: "transparent" /* for safari and chrome */,
              backgroundClip: "text", // for non-webkit browsers
              textFillColor: "transparent", // for non-webkit browsers
            }}
            className="navbar-brand"
          >
            <b>BharatXPLORE</b>
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  style={{ marginLeft: "1.2vw" }}
                  className="nav-link"
                  aria-current="page"
                  to="/"
                >
                  home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={{ marginLeft: "1.2vw" }}
                  className="nav-link"
                  to="/your-contributions"
                >
                  your-contributions
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={{ marginLeft: "1.2vw" }}
                  className="nav-link"
                  to="/contact-dev"
                >
                  contact-dev
                </Link>
              </li>
            </ul>
            <div
              className="navbar-buttons"
              style={{ display: "flex", marginRight: "10%" }}
            >
              {selectedState &&
                getCookie("token") &&
                location.pathname === "/" && (
                  <Link
                    to={`/contribute/${selectedStateId}`}
                    type="button"
                    className="buttons btn btn-primary btn-sm"
                    style={{ textDecoration: "none" }}
                  >
                    contribute
                  </Link>
                )}

              {selectedState &&
                getCookie("token") &&
                location.pathname === "/" && (
                  <div
                    className="selected-state"
                    style={{ color: "white", backgroundColor: "red" }}
                  >
                    <h5>{selectedState}</h5>
                  </div>
                )}

              {selectedState &&
                getCookie("token") &&
                location.pathname === "/" && (
                  <Link
                    to={`/all-contributions/${selectedStateId}`}
                    type="button"
                    className="buttons btn btn-primary btn-sm"
                    style={{ textDecoration: "none" }}
                  >
                    see all contributions
                  </Link>
                )}
            </div>
            {!getCookie("token") ? (
              <form className="d-flex">
                <Link
                  to="/login"
                  style={{ marginRight: "0.7vw", textDecoration: "none" }}
                  type="button"
                  className="buttons btn btn-primary"
                >
                  login
                </Link>
                <Link
                  to="/signup"
                  style={{ textDecoration: "none" }}
                  type="button"
                  className="buttons btn btn-primary"
                >
                  signup
                </Link>
              </form>
            ) : (
              <Link
                to="/login"
                style={{ textDecoration: "none" }}
                type="button"
                className="buttons btn btn-primary"
                onClick={() => {
                  setSelectedState(null);
                  logout();
                }}
              >
                logout
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
