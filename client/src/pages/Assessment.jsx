import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Paper,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../redux/actions/question";
import BottomNav from "../components/BottomNav";
import { updateUserById } from "../redux/actions/auth";
import { testVariable } from "../redux/actions/test";
const Assessment = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [timer, setTimer] = useState(30 * 60);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [id, setId] = useState(null);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);

  const history = useNavigate();
  const dispatch = useDispatch();
  const assessmentData = useSelector((state) => state.questions);
  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    setId(profile?.result?._id);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleTimeUp();
    }
  }, [timer]);
  const updateScore = async () => {
    try {
      if (!id) {
        console.error("Invalid id:", id);
        return;
      }
      const formData = {
        score: score,
      };
      await dispatch(updateUserById(id, formData));
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };
  
  const handleTimeUp = () => {
    console.log("Time's up! Redirecting to another page.");
    updateScore(); // Update score when time is up
    history("/results");
  };

  const handleSubmit = () => {
    const currentQuestion = assessmentData.questions[currentQuestionIndex];
    const selectedOptionObject = currentQuestion.options.find(
      (option) => option.optionText === selectedOption
    );
  
    setScore((prevScore) => prevScore + (selectedOptionObject.isCorrect ? currentQuestion.points : 0));
  
    if (selectedOptionObject && selectedOptionObject.isCorrect) {
      updateScore(); // Update score when submitting the last question
    }
  
    if (currentQuestionIndex === assessmentData.questions.length - 1) {
      dispatch(testVariable(false));
      console.log("Submitting last question! Redirecting to another page.");
      updateScore(); // Update score when submitting the last question
      history("/results");
    } else {
      setSelectedOption("");
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };
  

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [tabSwitchCount]);

  const handleVisibilityChange = () => {
    alert(
      `Warning: Tab Switch Detected, You are left with only ${3 -
        tabSwitchCount} chance`
    );
    if (document.hidden) {
      setTabSwitchCount((count) => {
        const updatedCount = count + 1;
  
        if (updatedCount >= 3) {
          dispatch(testVariable(false));
          console.log("Tab switched more than 1 time. Terminating test.");
          history("/results?copyCase=true");
        }
  
        return updatedCount;
      });
    }
  };
  
  

  if (
    !assessmentData.questions ||
    assessmentData.questions.length === 0 ||
    currentQuestionIndex >= assessmentData.questions.length
  ) {
    return <div>Loading...</div>;
  }

  const currentQuestion = assessmentData.questions[currentQuestionIndex];

  return (
    <>
      <BottomNav />
      <Container maxWidth="md" style={{ marginTop: "10%", height: "100vh" }}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Question {currentQuestionIndex + 1} / {assessmentData.questions.length}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {currentQuestion.question}
          </Typography>

          <FormControl component="fieldset" style={{ marginBottom: "20px" }}>
            <RadioGroup
              aria-label="options"
              name="options"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              {currentQuestion.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option.optionText}
                  control={<Radio />}
                  label={option.optionText}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2">
              Time Remaining: {Math.floor(timer / 60)}:{timer % 60}s
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!selectedOption}
            >
              Submit
            </Button>
          </div>

          {timer <= 0 && (
            <Typography
              variant="body2"
              style={{ color: "red", marginTop: "10px" }}
            >
              Time's up! Redirecting to another page.
            </Typography>
          )}

          {timer > 0 && (
            <CircularProgress
              variant="determinate"
              value={(timer / (30 * 60)) * 100}
              size={40}
              thickness={5}
              style={{ marginTop: "20px" }}
            />
          )}
        </Paper>
      </Container>
    </>
  );
};

export default Assessment;
