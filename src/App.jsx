import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [showUser, setShowUser] = useState(false);

  const profileUserName = (e) => {
    setUser(e);
  };

  const showProfileDiv = (e) => {
    e.preventDefault();
    setShowUser(!showUser);
  };


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/dashboard"
                >
                  Dashboard
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <button
                className="btn"
                onClick={(e) => {
                  showProfileDiv(e);
                }}
                type="button"
              >
                Profile
              </button>
              <div
                className="profile"
                style={showUser ? { display: "block" } : { display: "none" }}
              >
                <h6>Profile: {user || "Guest"}</h6>
              </div>
              <button
                className="btn btn-outline-danger"
                onClick={(e) => {
                  e.preventDefault();
                  sessionStorage.clear()
                  window.location.href = "/"

                }}
                type="button"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
      <Router>
        <Routes>
          <Route path="/" element={<Login profileName={profileUserName} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
