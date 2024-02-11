import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  const [timer, setTimer] = useState(30 * 60);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    setIsLoggedIn(!!profile); // !! converts the value to a boolean
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
      <h1>Driving Assessment 🔴</h1>
      <div className="items">
        <>
          <li>
            <a
              href="https://github.com/avezqureshi14/a3-lisiting-api-request"
              target="_blank"
              className="portf"
            >
              <span>{formatTime(timer)}</span>{" "}
              <i className="bx bx-time-five"></i>
            </a>
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
      </div>
    </nav>
  );
};

export default BottomNav;
