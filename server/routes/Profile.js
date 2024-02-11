const express = require("express");
const { register,   updateProfile } = require("../controllers/Profile");

const router = express.Router();


router.post("/register",register);
router.post("/update/:id",updateProfile);

module.exports = router;