import User from "../models/User.js";
import Note from "../models/Note.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();

  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  // Confirm data
  if (
    !username ||
    !password ||
    !Array.isArray(roles) ||
    !roles.length
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // Check for duplicate username
  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({
      message: "Duplicate username",
    });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10);

  // Create user object
  const userObject = {
    username,
    password: hashedPwd,
    roles,
  };

  // Save user
  const newUser = await User.create(userObject);

  if (newUser) {
    return res.status(201).json({
      message: `New user ${username} created`,
    });
  }

  res.status(400).json({
    message: "Invalid user data received",
  });
});

// @desc Update user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, roles, active, password } = req.body;

  // Confirm data
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // Find user
  const foundUser = await User.findById(id).exec();

  if (!foundUser) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  // Check duplicate username
  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate && duplicate._id.toString() !== id) {
    return res.status(409).json({
      message: "Duplicate username",
    });
  }

  // Update fields
  foundUser.username = username;
  foundUser.roles = roles;
  foundUser.active = active;

  // Update password if supplied
  if (password) {
    foundUser.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await foundUser.save();

  res.json({
    message: `${updatedUser.username} updated`,
  });
});

// @desc Delete user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "User ID required",
    });
  }

  // Check for assigned notes
  const note = await Note.findOne({ user: id }).lean().exec();

  if (note) {
    return res.status(400).json({
      message: "User has assigned notes",
    });
  }

  // Find user
  const foundUser = await User.findById(id).exec();

  if (!foundUser) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  // Delete user
  const result = await foundUser.deleteOne();

  res.json(
    `Username ${result.username} with ID ${result._id} deleted`
  );
});

export {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};