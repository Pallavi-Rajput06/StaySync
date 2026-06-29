const transporter = require("../config/mail");

const sendTestMail = async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Student City Test Mail",
      html: "<h2>Email Configuration Successful ✅</h2>",
    });

    res.status(200).json({
      success: true,
      message: "Email Sent Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { sendTestMail };