const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

const addQuestion = async (req, res) => {
  try {
    const { question, options, points, category} = req.body;
    const newQuestion = new Question({ question, options,points,category });
    const savedQuestion = await newQuestion.save();
    res.json(savedQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    
    // Send only the first two questions to the frontend
    const limitedQuestions = questions.slice(0, 10);

    res.json({ questions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
    addQuestion,
    getQuestions
};
