const mongoose = require("mongoose");

const optionSchema = {
  optionText: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
};

const questionSchema = {
  question: {
    type: String,
    required: true,
  },
  options: [optionSchema],
  points: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["rules", "practices", "sign"],
  },
};

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
