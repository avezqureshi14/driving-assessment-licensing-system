import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserById } from "../redux/actions/auth";
import Performance from "../components/Performance";
import Navbar from "../components/Navbar";
import { Paper, Button, Grid } from "@mui/material";

const Results = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const copyCase = queryParams.get("copyCase");
  const [id, setId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile && profile?.result && profile?.result?._id) {
      setId(profile?.result?._id);
    } else {
      console.error("Invalid profile or missing _id:", profile);
    }
  }, []);

  const updateScore = async (userId) => {
    try {
      if (!userId) {
        console.error("Invalid userId:", userId);
        return;
      }

      const formData = {
        score: 1000,
      };

      await dispatch(updateUserById(userId, formData));
    } catch (error) {
      console.error("Error updating score:", error);
      // Handle the error or inform the user
    }
  };

  useEffect(() => {
    if (copyCase === "true" && id) {
      const newSearch = new URLSearchParams(search);
      updateScore(id);
      newSearch.delete("copyCase");
      navigate({ search: newSearch.toString() });
    }
  }, [copyCase, id, search, navigate]);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid>
          <div className="perf_height_css" style={{ margin: "3rem" }}>
            <Paper style={{ padding: "3rem" }}>
              <Performance />
            </Paper>
            <Paper style={{ padding: "1rem 2rem", marginTop: '1rem', display: "flex", alignItems: "center" }}>
              Go to Profile for more Details{" "}
              <NavLink to={`/profile/${id}`} style={{ marginTop: "-20px" }} >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "20px" }}
                >
                  Profile
                </Button>
              </NavLink>
            </Paper>
          </div>
        </Grid>
      </div>
    </>
  );
};

export default Results;
