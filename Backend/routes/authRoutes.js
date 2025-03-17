const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { googleCallback, profile, logout } = require("../controllers/authController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("<a href='/auth/google'>Login with Google</a>");
});

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Generate JWT token for the user
    const token = jwt.sign({ userId: req.user.id, email: req.user.email }, "secret_key", {
      expiresIn: "1h",
    });

    // Send token as JSON response
    res.redirect(`http://localhost:5173/auth-success?token=${token}`);
  }
);

router.get("/profile", profile);

router.get("/logout", logout);

module.exports = router;
