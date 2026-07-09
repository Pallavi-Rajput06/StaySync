const express = require("express");
const passport = require("passport");
const authMiddleware = require("../middleware/auth.middleware");
const generateToken = require("../utils/generateToken");
const { toggleFavorite } = require("../controllers/user.controller");
const { getFavorites } = require("../controllers/user.controller");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile, 
  forgotPassword,
  verifyOTP,
  resetPassword,
  updateUserProfile
} = require("../controllers/user.controller");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);

router.post("/verify-otp", verifyOTP);

router.post("/reset-password", resetPassword);

router.get(
  "/profile",
  authMiddleware,
  getProfile
);



// Google Login

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google Callback

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     session: false,
//     failureRedirect: "http://localhost:5173",
//   }),
//   (req, res) => {
//     const token = generateToken(req.user._id);

//     res.redirect(
//       `http://localhost:5173/google-success?token=${token}`
//     );
//   }
// );




router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
  (req, res) => {
    const token = generateToken(req.user._id);
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${frontendUrl}/google-success?token=${token}`);
  }
);

router.put(
  "/favorites/:hostelId",
  authMiddleware,
  toggleFavorite
);

router.get(
  "/favorites",
  authMiddleware,
  getFavorites
);

router.put(
  "/profile",
  authMiddleware,
  updateUserProfile
);

module.exports = router;