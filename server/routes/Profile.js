const express = require("express");
const { register,   updateProfile, signin, getUserById } = require("../controllers/Profile");

const router = express.Router();


router.post("/register",register);
router.post("/signin",signin);
router.put("/update/:id",updateProfile);
router.get("/:id",getUserById);

module.exports = router;