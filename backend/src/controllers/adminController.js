const User = require("../models/Admin");
const bcrypt = require("bcryptjs");

exports.registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin user with the hashed password and isAdmin flag set to true
    const newAdmin = new User({
      email,
      password: hashedPassword,
      isAdmin: true, // Assuming there's an 'isAdmin' field in your User schema
    });

    // Save the new admin user to the database
    const savedAdmin = await newAdmin.save();

    // Exclude password from the response
    const adminWithoutPassword = { ...savedAdmin._doc };
    delete adminWithoutPassword.password;

    res.status(200).json({
      message: "Admin registered successfully",
      user: adminWithoutPassword,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists in the database
    const admin = await User.findOne({ email, isAdmin: true }); // Only find users with isAdmin flag set to true
    if (!admin) {
      return res
        .status(400)
        .json({ message: "Admin Email not found", type: "email" });
    }

    // Validate the password using bcrypt compare
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect Admin password", type: "password" });
    }

    // Password matches, prepare the admin data for response
    const adminDataToSend = {
      _id: admin._id,
      email: admin.email,
    };

    res.status(200).json({ admin: adminDataToSend });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
