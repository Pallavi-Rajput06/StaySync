const express = require("express");

const router = express.Router();

const {
  sendTestMail,
} = require("../controllers/testMail.controller");

router.get("/test", sendTestMail);

module.exports = router;