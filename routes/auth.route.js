const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {authMiddleware,checkRole} = require("../middlewares/auth");
const userModel = require("../models/user.model");
const authRouter = express.Router();

authRouter.post("/register", authMiddleware, async (req, res) => {
  const {
    name,
    email,
    mobileNumber,
    password,
    role,
    specialization,
    availableDays,
  } = req.body;
  const user = await userModel.findOne({ email });
  if (user)
    return res.status(403).json({ msg: "User already exists,Please login" });

  const hashpassword = await bcrypt.hash(password, process.env.SALT_ROUNDS);
  const newUser = new userModel({
    name,
    email,
    mobileNumber,
    password: hashpassword,
    role,
    specialization,
    availableDays,
  });
  await newUser.save();
  res.status(201).json({ msg: "User registered successfully" });
});

authRouter.post("/login", authMiddleware, async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user)
    return res.status(403).json({ msg: "User not found, Please signup" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(403).json({ msg: "Incorrect password" });
  const token = jwt.sign(user._id, process.env.JWT_SECRET, {
    expiresIn: "3hr",
  });
  res.status(200).json({ msg: "Login successfull" });
});

module.exports=authRouter