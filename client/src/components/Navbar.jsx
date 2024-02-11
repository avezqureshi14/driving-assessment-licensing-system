import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [timer, setTimer] = useState(30 * 60);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id,setId] = useState('')

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    setIsLoggedIn(!!profile); // !! converts the value to a boolean
    setId(profile?.result?._id)
  }, []);

  const logout = () => {
    localStorage.removeItem("profile");
    setIsLoggedIn(false); // Update state to reflect logout
    window.location.reload(); // Reload the page after logout
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <nav>
      <h1>
        <NavLink to="/">Avez.</NavLink>
      </h1>
      <div className="items">
        <li>Home</li>
        {isLoggedIn ? (
          <>
            <li>
              <NavLink to="/rules" className="portf">
                <span>Take Test</span>
              </NavLink>
            </li>
            <li>
              <button className="portf" onClick={logout}>
                <span>Logout</span>
              </button>
            </li>
            <li>
              <NavLink to={`/profile/${id}`} className="portf2">
                <i className="bx bx-user"></i>
              </NavLink>
            </li>
            <li>
              <a
                href="https://github.com/avezqureshi14/a3-lisiting-api-request"
                target="_blank"
                className="portf2"
              >
                <i style={{ marginLeft: 0 }} className="bx bxl-github"></i>
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/register" className="portf2">
                <i className="bx bx-user"></i>
              </NavLink>
            </li>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
