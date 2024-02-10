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
    const allQuestions = await Question.find();
    res.json(allQuestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    addQuestion,
    getQuestions
};
