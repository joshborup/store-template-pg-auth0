const express = require("express");
const router = express.Router();
const {
	login,
	logout,
	sessionCheck
} = require("../controllers/authController");

// middleware that is specific to this router

// define the home page route

// define the about route
router.get("/get_session", sessionCheck);
router.get("/callback", login);
router.get("/logout", logout);

module.exports = router;
