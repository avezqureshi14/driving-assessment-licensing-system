import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Avatar,
  Paper,
  Button,
} from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Navbar from "../components/Navbar";
import { useParams, NavLink } from "react-router-dom";

const License = () => {
  const { id } = useParams();
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds >= 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }else if(seconds<0){
        setSeconds(0);
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);
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

  useEffect(() => {
    const content = document.getElementById("componentToPDF");
    console.log("Content Element:", content);
    handleGeneratePDF();
  }, []);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    setProfileData(profile?.result);
  }, []);

  const handleGeneratePDF = () => {
    const content = document.getElementById("componentToPDF");

    if (!content) {
      console.error("Element with id 'componentToPDF' not found.");
      return;
    }
    setTimeout(() => {
      html2canvas(content)
        .then((canvas) => {
          const pdf = new jsPDF("portrait", "mm", "a4");
          const imgData = canvas.toDataURL("image/png");

          pdf.addImage(imgData, "PNG", 10, 10, 190, 250); // Adjust the position and size as needed

          pdf.save("LICENSE.pdf");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    }, 10000);
  };

  if (!profileData) {
    return <>Loading...</>;
  }

  return (
    <>
      <Navbar />
      <Container
        style={{ marginTop: "5%", width: "500px" }}
        className="height_css"
        maxWidth="md"
      >
        <Paper
          style={{
            padding: "50px",
            opacity: 0.9,
          }}
        >
          <div id="componentToPDF">
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
                  <Typography variant="h6">License No.</Typography>
                  <Typography> LN5591264795</Typography>
                </Grid>
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
              </Grid>
            </Paper>
          </div>
          {/* Button to generate PDF */}
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
            onClick={handleGeneratePDF}
          >
            Generate PDF in  {seconds >= 0 ? seconds : 0 } seconds
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default License;
