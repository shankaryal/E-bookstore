const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Exclude password from the response
    const userWithoutPassword = { ...savedUser._doc };
    delete userWithoutPassword.password;

    res.status(200).json({
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email not found", type: "email" });
    }

    // Validate the password using bcrypt compare
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect password", type: "password" });
    }

    // Password matches, exclude password from the response
    user.password = undefined;

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserProfileById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the update values are different from the current data
    if (username && user.username !== username) {
      user.username = username;
    }

    if (email && user.email !== email) {
      // Check if the provided email is already registered by another user
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ message: "Email already exists" });
      }
      user.email = email;
    }

    // Save updated user information to the database
    const updatedUser = await user.save();

    // Exclude sensitive information from the response
    updatedUser.password = undefined; // Exclude password field

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // User ID from URL params

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude sensitive information from the response
    user.password = undefined;

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id; // User ID from URL params

    // Find the user by ID and delete
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude sensitive information from the response
    deletedUser.password = undefined;

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
