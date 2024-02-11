// LoginForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signin } from "../redux/actions/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Grid } from "@mui/material";
import Navbar from "./Navbar";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await dispatch(signin(formData));
      navigate("/?reload=true");
    } catch (error) {
      setError("Error: Something went wrong.");
      console.error("Error:", error.message);
      console.error("Response Data:", error.response.data);
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
    <Navbar/>
    <div className="main">
      <div className="space1"></div>
      <div className="loginSpace2"  style={{ marginTop: "10%", height:"100vh" }} >
        <div className="formContainer">
        <div className="formBox">
        <div className="heading">
                <Typography variant="h5">Login</Typography>
              </div>
          <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  name="email"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  value={formData.email}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  name="password"
                  variant="outlined"
                  margin="normal"
                  onChange={handleChange}
                  value={formData.password}
                />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
            <NavLink to='/register' >
              <Button
                variant="text"
                fullWidth
                style={{ marginLeft: "0.4rem", textDecoration: "underline" }}
              >
                Don't have an account, Register
              </Button>
              </NavLink>
          </form>
        </div>
      </div>
      </div>
      <div className="space3"></div>
    </div>
    </>
  );
};

export default LoginForm;
