const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// Register a new user
router.post("/register", UserController.register);

// Login route
router.post("/login", UserController.login);

// Get user by ID route
router.get("/:id", UserController.getUserById);

// Delete user by ID route
router.delete("/:id", UserController.deleteUserById);

//Update user profile route using user ID in the URL params
router.put("/:id", UserController.updateUserProfileById);

module.exports = router;
