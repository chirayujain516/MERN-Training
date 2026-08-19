const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    maxLength: 120,
    required: true,
  },
  state: {
    type: String,
    maxLength: 50,
    required: true,
  },
  country: {
    type: String,
    maxLength: 50,
    required: true,
  },
});

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 120,
      required: true,
      trim: true,
    },
    skills: {
      type: [String],
      required: true,
      trim: true,
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },
    stream: {
      type: String,
      required: true,
      trim: true,
    },
    roll: {
      type: Number,
      required: true,
      trim: true,
      min: 1,
      max: 1000,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          return value.endsWith("@gmail.com");
        },
        message: "Only Gmail addresses are allowed.",
      },
    },
    address: addressSchema,
  },
  { timestamps: true },
);

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 64,
    required: true,
  },
  email: {
    type: String,
    maxLength: 150,
    required: true,
    validate: {
      validator: function (value) {
        return value.endsWith("@gmail.com");
      },
      message: "Only Gmail address are allowed",
    },
  },
  password: {
    type: String,
    minLength: 5,
    maxLength: 200,
    required: true,
  },
});

const StudentModel = mongoose.model("student", studentSchema);
const RegisterModel = mongoose.model("register", registerSchema);

module.exports = { StudentModel, RegisterModel };
