const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const testRoutes = require("./src/routes/test.routes");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/user.routes");
const hostelRoutes = require(
  "./src/routes/hostel.routes"
);

const mailRoutes = require("./src/routes/mail.routes");

const session = require("express-session");

const passport = require("./src/config/passport");

connectDB();

const app = express();

app.use(express.json());


app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Student City Relocation API Running");
});
app.use("/api/test", testRoutes);
app.use("/api/users", userRoutes);
app.use(
  "/api/hostels",
  hostelRoutes
);
app.use("/api/mail", mailRoutes);






const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});