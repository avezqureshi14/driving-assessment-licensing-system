import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Paper,
  InputLabel,
  Input,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getUserById } from "../redux/actions/auth";
import { updateUserById } from "../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";

const Update = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
    addressLine: "",
    landmark: "",
    state: "",
    city: "",
    district: "",
    pincode: "",
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getUserById(id));
    setFormData(user);
  }, [dispatch,id]);

  console.log(formData)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Dispatch the updateUserById action with the user ID and updated data
    try {
      await dispatch(updateUserById(id, formData));
  
      // Reset form or redirect to profile page
      navigate(`{/profile/${id}}`);
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle the error (display an error message, etc.)
    }
  };
  
  if (!formData) {
      return <>Loading...</>
  }
  return (
    <Container
      style={{ marginTop: "5%" }}
      className="update_height_css"
      maxWidth="md"
    >
      <NavLink to={`/profile/${formData._id}`} >
       <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ margin: "20px 0" }}
          >
            Back
          </Button>
          </NavLink>
      <Paper
        style={{
          padding: "50px",
          opacity: 0.9,
        }}
      >
        <Grid item xs={12} align="center">
          <Avatar
            alt={formData?.fullName}
            src={formData?.photo?.name}
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <Typography variant="h5">Update Profile</Typography>
          <TextField
            label="Full Name"
            name="fullName"
            value={formData?.fullName || ""}
            onChange={handleInputChange}
            fullWidth
            style={{ marginTop: "7px" }}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData?.email || ""}
            onChange={handleInputChange}
            fullWidth
            style={{ marginTop: "7px" }}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData?.password || ""}
            onChange={handleInputChange}
            fullWidth
            style={{ marginTop: "7px" }}
            required
          />
          <TextField
            label="Mobile"
            name="mobile"
            value={formData?.mobile || ""}
            onChange={handleInputChange}
            fullWidth
            style={{ marginTop: "7px" }}
            required
          />

          {/* Address */}
          <Typography variant="h6" style={{ marginTop: "20px" }}>
            Address
          </Typography>
          <TextField
            label="Address Line"
            name="addressLine"
            value={formData?.address?.[0]?.addressLine || ""}
            onChange={handleInputChange}
            fullWidth
            style={{ marginTop: "7px" }}
            required
          />
          <TextField
            label="Landmark"
            name="landmark"
            value={formData?.address?.[0]?.landmark || ""}
            onChange={handleInputChange}
            fullWidth
            style={{ marginTop: "7px" }}
            required
          />
          <TextField
            label="State"
            name="state"
            value={formData?.address?.[0]?.state || ""}
            onChange={handleInputChange}
            fullWidth
            style={{ marginTop: "7px" }}
            required
          />
          <TextField
            label="City"
            name="city"
            value={formData?.address?.[0]?.city || ""}
            onChange={handleInputChange}
            fullWidth
            style={{ marginTop: "7px" }}
            required
          />
          <TextField
            label="District"
            name="district"
            value={formData?.address?.[0]?.district || ""}
            onChange={handleInputChange}
            fullWidth
            style={{ marginTop: "7px" }}
            required
          />
          <TextField
            label="Pincode"
            name="pincode"
            value={formData?.address?.[0]?.pincode || ""}
            onChange={handleInputChange}
            fullWidth
            style={{ marginTop: "7px" }}
            required
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: "20px" }}
          >
            Update Profile
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Update;
