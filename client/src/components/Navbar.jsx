import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a
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
          </a>
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
                  target="_blank"
                >
                  your-contributions
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={{ marginLeft: "1.2vw" }}
                  className="nav-link"
                  to="/contact-dev"
                  target="_blank"
                >
                  contact-dev
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link
                  to="/login"
                  style={{ marginRight: "0.7vw", textDecoration: "none" }}
                  type="button"
                  className="btn btn-primary"
                >
                  login
                </Link>
                <Link
                  to="/signup"
                  style={{ textDecoration: "none" }}
                  type="button"
                  className="btn btn-primary"
                >
                  signup
                </Link>
              </form>
            ) : (
              <Link
                to="/login"
                style={{ textDecoration: "none" }}
                type="button"
                className="btn btn-primary"
              >
                logout
              </Link>
            )}
          </div>
        </div>
      </nav>
      <div className="gradient-background"></div>
    </>
  );
};

export default Navbar;
