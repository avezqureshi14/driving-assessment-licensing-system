const express = require("express");
const { addQuestion, getQuestions } = require("../controllers/Question");

const router = express.Router();


router.post("/add",addQuestion);
router.get("/",getQuestions);

module.exports = router;