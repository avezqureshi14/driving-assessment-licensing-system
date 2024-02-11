const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const Profile = require("../models/Profile");

const secret = "test";

cloudinary.config({
  cloud_name: "ddpi99yjr",
  api_key: "194893786515793",
  api_secret: "qrHEg7Nb57ONpI6nW5HE_sMzERw",
});

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
  console.log(req.body)
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
  const { userId } = req.params; // Extract user ID from request parameters

  try {
    const user = await Profile.findById(userId); // Find user by ID

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
  const photo = req.files.photo;
  const identity = req.files.identity;
  const residency = req.files.residency;
  const files = [photo, identity, residency];

  try {
    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });

    const results = await Promise.all(uploadPromises);

    // Update updateFields with Cloudinary URLs
    updateFields.photo = results[0].secure_url;
    updateFields.identity = results[1].secure_url;
    updateFields.residency = results[2].secure_url;

   
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
