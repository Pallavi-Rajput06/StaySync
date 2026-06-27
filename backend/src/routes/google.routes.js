const express = require("express");

const router = express.Router();

const { googleLogin } = require("../controllers/google.controller");

router.post("/login", googleLogin);

module.exports = router;