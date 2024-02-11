const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const Profile = require("../models/Profile");

const secret = "test";

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await Profile.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "7d",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const register = async (req, res) => {
  const { fullName, email, password, mobile, address } = req.body; // Include the 'category' field
  try {
    const oldUser = await Profile.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await Profile.create({
      fullName,
      email,
      password: hashedPassword,
      mobile,
      address,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params; // Extract user ID from request parameters
  try {
    const user = await Profile.findById(id); // Find user by ID

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // User found, send the user object in the response
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch user", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Profile.find(); // Fetch all users from the database
    res.json(users); // Send the users as a JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // If an error occurs, send an error response
  }
};

const updateProfile = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;
  try {
   
    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res
      .status(200)
      .json({
        message: "Profile updated successfully",
        profile: updatedProfile,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// app.post("/upload",(req,res)=>{
//   const file = req.files.photo;
//   cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
//     console.log(result);
//   })
// })

module.exports = { signin, register, getAllUsers, getUserById, updateProfile };
