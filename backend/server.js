const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const testRoutes = require("./src/routes/test.routes");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/user.routes");
const hostelRoutes = require(
  "./src/routes/hostel.routes"
);


dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Student City Relocation API Running");
});
app.use("/api/test", testRoutes);
app.use("/api/users", userRoutes);
app.use(
  "/api/hostels",
  hostelRoutes
);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});