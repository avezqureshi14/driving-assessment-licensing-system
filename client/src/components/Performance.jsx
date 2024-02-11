import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import {useDispatch, useSelector} from 'react-redux'
import { getUserById } from "../redux/actions/auth";
const Performance = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [id, setId] = useState(null);
  const [score, setScore] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getUserById(id));
    setScore(user.score);
  }, [dispatch,id]);
  console.log(score)
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    setId(profile?.result?._id);
  }, []);
  console.log(id);
  // Assuming you have a state with user's marks in each category
  const [userMarks, setUserMarks] = useState({
    total: 75,
    scored: score,
  });
  // Simulating fetching user marks from the server
  useEffect(() => {
    // Replace this with an actual API call to fetch user marks
    // For now, using dummy data
    const dummyUserMarks = {
      total: 75,
      scored: score,
    };

    setUserMarks(dummyUserMarks);
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy the previous chart instance
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      const data = {
        labels: ["Total", "Scored"],
        datasets: [
          {
            label: "Marks Obtained",
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(75,192,192,0.4)",
            hoverBorderColor: "rgba(75,192,192,1)",
            data: [userMarks.total, userMarks.scored],
          },
        ],
      };

      const options = {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      };

      // Create a new chart instance
      chartInstanceRef.current = new Chart(ctx, {
        type: "bar",
        data: data,
        options: options,
      });
    }
  }, [userMarks]);

  return (
    <div style={{display:"flex",flexDirection:"column"}} >
      <h2>User Test Performance</h2>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default Performance;
