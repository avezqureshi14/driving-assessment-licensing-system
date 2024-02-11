import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import {
  Container,
  Typography,
  Button,
  Paper,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Navbar from "./Navbar";
import { testVariable } from "../redux/actions/test";

const Rules = () => {
  const [acceptRules, setAcceptRules] = useState(false);
  const navigate = useNavigate();
  const handleAcceptanceChange = () => {
    setAcceptRules((prevValue) => !prevValue);
  };
  const [id, setId] = useState(null);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile && profile?.result && profile?.result?._id) {
      setId(profile?.result?._id);
    } else {
      console.error("Invalid profile or missing _id:", profile);
    }
  }, []);
  const test = useSelector((state)=>state.testRed);
  console.log(test)  
  const handleStartExam = () => {
    if (acceptRules) {
      navigate("/assessments");
      console.log("Starting the exam...");
    } else {
      alert("Please accept the rules before starting the exam.");
    }
  };
  console.log(test)
  return (
    <>
      <Navbar />
      {test === true ? (
        <Container maxWidth="md" style={{ marginTop: "5%", height: "100vh" }}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>
              Exam Rules
            </Typography>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Section</TableCell>
                    <TableCell>Rules</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Before the Exam</TableCell>
                    <TableCell>
                      <ol>
                        <li>Technical Requirements</li>
                        <li>Environment Check</li>
                        <li>Authorized Materials</li>
                      </ol>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>During the Exam</TableCell>
                    <TableCell>
                      <ol>
                        <li>No Communication</li>
                        <li>No Unauthorized Tools</li>
                        <li>Time Management</li>
                        <li>Focus on Your Screen</li>
                        <li>Follow Instructions</li>
                        <li>Save Progress</li>
                        <li>Internet Connection</li>
                      </ol>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>After the Exam</TableCell>
                    <TableCell>
                      <ol>
                        <li>Submission Procedure</li>
                        <li>Contact Support</li>
                        <li>Feedback</li>
                        <li>Avoid Discussing Specifics</li>
                        <li>Review Guidelines</li>
                      </ol>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptRules}
                  onChange={handleAcceptanceChange}
                />
              }
              label="I have read and agree to the exam rules."
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleStartExam}
              disabled={!acceptRules}
              style={{ marginTop: "20px" }}
            >
              Start Exam
            </Button>
          </Paper>
        </Container>
      ) : (
        <>
          <Paper className="height_css" style={{ paddingTop:"5%", textAlign: "center" }} >

              <h3>You have already given the test, Please check the profile for more info</h3>
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
        </>
      )}
    </>
  );
};

export default Rules;
