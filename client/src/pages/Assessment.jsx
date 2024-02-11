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
  FormLabel,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../redux/actions/question";

const Assessment = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [timer, setTimer] = useState(30 * 60);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const history = useNavigate();

  const dispatch = useDispatch();
  const assessmentData = useSelector((state) => state.questions);
  console.log(score)
  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleTimeUp();
    }
  }, [timer]);

  const handleTimeUp = () => {
    console.log("Time's up! Redirecting to another page.");
    history("/results");
  };

  const handleSubmit = () => {
    const currentQuestion = assessmentData.questions[currentQuestionIndex];
    const selectedOptionObject = currentQuestion.options.find(
      (option) => option.optionText === selectedOption
    );
  
    if (selectedOptionObject && selectedOptionObject.isCorrect) {
      setScore((prevScore) => prevScore + currentQuestion.points);
    }
  
    if (currentQuestionIndex === assessmentData.questions.length - 1) {
      console.log("Submitting last question! Redirecting to another page.");
      history("/results");
    } else {
      setSelectedOption("");
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
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
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Question {currentQuestionIndex + 1}
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
  );
};

export default Assessment;
