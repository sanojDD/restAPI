const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// Path: /api/users/register
router.post("/register", registerUser);

// Path: /api/users/login
router.post("/login", loginUser);

module.exports = router;
