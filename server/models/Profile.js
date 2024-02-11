const mongoose = require("mongoose");

const profileSchema = {
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  address: [
    {
      addressLine: {
        type: String,
        required: true,
      },
      landmark: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
    },
  ],
  photo: {
    type: String,
    required: false,
  },
  identity: {
    type: String,
    required: false,
  },
  residency: {
    type: String,
    required: false,
  },
  score: {
    type: Number,
    required: false,
    default: 0,
  },
};

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
