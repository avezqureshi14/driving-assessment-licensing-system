import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [timer, setTimer] = useState(30 * 60);

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
      <h1>Avez.</h1>
      <div className="items">
        <li>Home</li>
        <li>
          <a
            href="https://github.com/avezqureshi14/a3-lisiting-api-request"
            target="_blank"
            className="portf"
          >
            <span>Github</span> <i className="bx bxl-github"></i>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/avezqureshi14/a3-lisiting-api-request"
            target="_blank"
            className="portf"
          >
            <span>{formatTime(timer)}</span> <i className="bx bx-time-five"></i>
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
        <li>
          <a
            href="https://github.com/avezqureshi14/a3-lisiting-api-request"
            target="_blank"
            className="portf2"
          >
            <i className="bx bx-user"></i>
          </a>
        </li>
      </div>
    </nav>
  );
};

export default Navbar;
