// adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Admin registration endpoint
router.post("/register", adminController.registerAdmin);

// Admin login endpoint
router.post("/login", adminController.loginAdmin);

module.exports = router;
