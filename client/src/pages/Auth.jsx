import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup, signin } from "../redux/actions/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";
import Navbar from "../components/Navbar";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFormData = {
    fullName: "",
    email: "",
    password: "",
    mobile: "",
    address: {
      addressLine: "",
      landmark: "",
      state: "",
      city: "",
      district: "",
      pincode: "",
    },
  };

  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState("");

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors on form submission

    try {
      await dispatch(signup(formData));
      navigate("/?reload=true");
    } catch (error) {
      setError("Error: Something went wrong."); // Set error message
      console.error("Error:", error.message);
      console.error("Response Data:", error.response.data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update address field separately
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        address: {
          ...prevFormData.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  return (
    <>
    <Navbar/>
    <Container component="main" style={{ marginTop: "5%", height:"100vh" }} maxWidth="xs">
      <div style={{ margin: "2rem" }}>
        <div className="space1"></div>
        <div className="loginSpace2">
          <div className="formContainer">
            <div className="formBox">
              <div className="heading">
                <Typography variant="h5">Register</Typography>
              </div>
              <form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                  <>
                    {/* Step 1 Fields */}
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
                    <TextField
                      fullWidth
                      type="text"
                      label="Full Name"
                      name="fullName"
                      variant="outlined"
                      margin="normal"
                      onChange={handleChange}
                      value={formData.fullName}
                    />
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    {/* Step 2 Fields */}
                    <TextField
                      fullWidth
                      type="text"
                      label="Mobile Number"
                      name="mobile"
                      variant="outlined"
                      margin="normal"
                      onChange={handleChange}
                      value={formData.mobile}
                    />
                    <TextField
                      fullWidth
                      type="text"
                      label="Address Line"
                      name="address.addressLine"
                      variant="outlined"
                      margin="normal"
                      onChange={handleChange}
                      value={formData.address.addressLine}
                    />
                    <TextField
                      fullWidth
                      type="text"
                      label="Landmark"
                      name="address.landmark"
                      variant="outlined"
                      margin="normal"
                      onChange={handleChange}
                      value={formData.address.landmark}
                    />
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    {/* Step 3 Fields */}
                    <TextField
                      fullWidth
                      type="text"
                      label="State"
                      name="address.state"
                      variant="outlined"
                      margin="normal"
                      onChange={handleChange}
                      value={formData.address.state}
                    />
                    <TextField
                      fullWidth
                      type="text"
                      label="City"
                      name="address.city"
                      variant="outlined"
                      margin="normal"
                      onChange={handleChange}
                      value={formData.address.city}
                    />
                    <TextField
                      fullWidth
                      type="text"
                      label="District"
                      name="address.district"
                      variant="outlined"
                      margin="normal"
                      onChange={handleChange}
                      value={formData.address.district}
                    />
                    <TextField
                      fullWidth
                      type="text"
                      label="Pincode"
                      name="address.pincode"
                      variant="outlined"
                      margin="normal"
                      onChange={handleChange}
                      value={formData.address.pincode}
                    />
                  </>
                )}

                {/* Navigation Buttons */}
                {currentStep > 1 && (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handlePrevStep}
                  >
                    Previous
                  </Button>
                )}

                {currentStep < 3 && (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="margin-css"
                    onClick={handleNextStep}
                  >
                    Next
                  </Button>
                )}

                {currentStep === 3 && (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="margin-css"
                  >
                    Register
                  </Button>
                )}
              </form>
                <NavLink to='/login' >
              <Button
                variant="text"
                fullWidth
                style={{ marginLeft: "0.4rem", textDecoration: "underline" }}
              >
                Already have an account, Login
              </Button>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="space3"></div>
      </div>
    </Container>
    </>
  );
};

export default Auth;
