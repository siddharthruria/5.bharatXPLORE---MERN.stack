import React from "react";

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
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  style={{ marginLeft: "1.0vw" }}
                  className="nav-link"
                  aria-current="page"
                  href="/"
                >
                  home
                </a>
              </li>
              <li className="nav-item">
                <a
                  style={{ marginLeft: "1.2vw" }}
                  className="nav-link"
                  href="/"
                >
                  your-contributions
                </a>
              </li>
              <li className="nav-item">
                <a
                    style={{ marginLeft: "1.2vw" }}
                  className="nav-link"
                  href="/"
                  id="contact-dev-link"
                >
                  contact dev
                </a>
              </li>
            </ul>
            <button type="button" class="btn btn-primary">
              login
            </button>
            <button type="button" class="btn btn-primary">
              signup
            </button>
          </div>
        </div>
      </nav>
      <div className="gradient-background"></div>
    </>
  );
};

export default Navbar;
