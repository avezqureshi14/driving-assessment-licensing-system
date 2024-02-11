import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import Navbar from "./Navbar";
import { updateUserById } from "../redux/actions/auth";
import {useDispatch} from 'react-redux'
import {useParams} from "react-router-dom"
const Document = () => {
  const [photoFile, setPhotoFile] = useState(null);
  const [identityFile, setIdentityFile] = useState(null);
  const [residencyFile, setResidencyFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const navigate = useParams();
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    setId(profile?.result?._id);
  }, []);
  const [formData, setFormData] = useState({
    photo: "",
    identity: "",
    residency: "",
  });
  const handleFileChange = (event, setFile) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const uploadFile = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "images_preset");

    try {
      let cloudName = "ddpi99yjr";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Upload photo file
      const photoUrl = await uploadFile(photoFile);

      // Upload identity file
      const identityUrl = await uploadFile(identityFile);

      // Upload residency file
      const residencyUrl = await uploadFile(residencyFile);

      // Handle backend API request or any further logic here
      setFormData({
        ...formData,
        photo: photoUrl,
        identity: identityUrl,
        residency: residencyUrl,
      });

      // Handle backend API request or any further logic here
      await dispatch(updateUserById(id, formData));

      // Reset states
      setPhotoFile(null);
      setIdentityFile(null);
      setResidencyFile(null);

      console.log("Files upload success!");
      setLoading(false);
      navigate(`{/profile/${id}}`)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <Container
        component="main"
        maxWidth="xs"
        style={{ height: "100vh", marginTop: "5%" }}
      >
        <Paper
          elevation={3}
          style={{
            padding: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Upload Documents</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} style={{ marginTop: 16 }}>
              <Grid item xs={12}>
                <TextField
                  type="file"
                  fullWidth
                  label="Upload Photo"
                  onChange={(event) => handleFileChange(event, setPhotoFile)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="file"
                  fullWidth
                  label="Upload Identity Proof"
                  onChange={(event) => handleFileChange(event, setIdentityFile)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="file"
                  fullWidth
                  label="Upload Residency Proof"
                  onChange={(event) =>
                    handleFileChange(event, setResidencyFile)
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: 16 }}
            >
              Submit
            </Button>
          </form>
          {loading && <>Loading...</>}
        </Paper>
      </Container>
    </>
  );
};

export default Document;
