import React, { useState, useEffect } from "react";
import { Container, Typography, Grid,Button, Avatar, Paper } from "@mui/material";
import Performance from "../components/Performance";
import Navbar from "../components/Navbar";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../redux/actions/auth";
const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    address: {
      addressLine: "",
      landmark: "",
      state: "",
      city: "",
      district: "",
      pincode: "",
    },
    photo: "",
    identity: "",
    residency: "",
    score: 0,
  });
  const user = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getUserById(id));
    setProfileData(user);
  }, [dispatch,id]);
  // useEffect(() => {
  //   const profile = JSON.parse(localStorage.getItem("profile"));
  //   // setProfileData(profile?.result);
  // }, []);
  const navigate = useNavigate();
  const handleUpload = ()=>{
    navigate("/documents")
  }
  const isIdentity = profileData?.identity;
  const isResidency = profileData?.residency;
  const score = profileData?.score;
  let remark;
  if (score === 0) {
    remark = "TT"; // take test
  } else if (score === 1000) {
    remark = "CC"; // copy case
  } else if (score !== 0 && score < 30) {
    remark = "F"; // fail
  } else if (score !== 0 && score > 30) {
    remark = "P"; // pass
  }
  
  if(!profileData){
    return <>Loading...</>
  }


  // Simulating fetching user profile data from the server
  return (
    <>
      <Navbar />
      <Container
        style={{ marginTop: "5%" }}
        className="height_css"
        maxWidth="md"
      >
        <Paper
          style={{
            padding: "50px",
            opacity: 0.9,
          }}
        >
          <Grid item xs={12} align="center">
            <Avatar
              alt={profileData.fullName}
              src={profileData.photo}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid>
            <Grid item xs={12} align="center">
              <Typography variant="h5">{profileData.fullName}</Typography>
              <Typography variant="subtitle1">{profileData.email}</Typography>
              <span>
                <NavLink to={`/update/${profileData._id}`}>
                  <i className="bx bx-pencil"></i>
                </NavLink>
              </span>
            </Grid>
          </Grid>
          <Paper
            elevation={3}
            style={{
              padding: "2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "none",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">Contact Information</Typography>
                <Typography>Mobile: {profileData.mobile}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Address</Typography>
                <Typography>
                  {profileData.address?.[0]?.addressLine},{" "}
                  {profileData.address?.[0]?.landmark}
                </Typography>
                <Typography>
                  {profileData.address?.[0]?.city},{" "}
                  {profileData.address?.[0]?.state},{" "}
                  {profileData.address?.[0]?.pincode}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Identity Documents</Typography>
                <Typography>
                  Aadhar: {isIdentity ? "Uploaded" : "Not uploaded"}
                </Typography>
                <Typography>
                  Residency: {isResidency ? "Uploaded" : "Not uploaded"}
                </Typography>
                <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              style={{ marginTop: "20px" }}
            >
              Update/Upload Docs
            </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Remark</Typography>
                {remark === "TT" && (
                  <NavLink to="/rules" className="portf_css">
                    Take Test
                  </NavLink>
                )}
                {remark === "CC" && (
                  <Typography className="danger_portf_css" >
                    Please Visit the RTO and pay the fine of Copy Case
                  </Typography>
                )}
                {remark === "P" && (
                  <NavLink to="/download" className="suc_portf_css">
                    Click Here to get the License
                  </NavLink>
                )}
                {remark === "F" && (
                  <NavLink to="/assessments" className="danger_portf_css">
                    Please try after 3 months
                  </NavLink>
                )}
              </Grid>
            </Grid>
            <Grid style={{ marginTop: 0 }}>
              <Performance />
            </Grid>
          </Paper>
        </Paper>
      </Container>
    </>
  );
};

export default Profile;
