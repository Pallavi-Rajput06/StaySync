const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const testRoutes = require("./src/routes/test.routes");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/user.routes");
const hostelRoutes = require("./src/routes/hostel.routes");
const reviewRoutes = require("./src/routes/review.routes");
const cityGuideRoutes = require("./src/routes/cityGuide.routes");
const mailRoutes = require("./src/routes/mail.routes");
const session = require("express-session");
const passport = require("./src/config/passport");
const CityGuide = require("./src/models/cityGuide.model");

const seedCityGuides = async () => {
  try {
    const count = await CityGuide.countDocuments();
    if (count === 0) {
      console.log("Seeding default city relocation guides...");
      await CityGuide.create([
        {
          city: "Indore",
          overview: "Indore, the cleanest city in India, is a major educational hub in central India, housing both IIT and IIM. It is known for its rich culinary heritage, warm culture, and affordable student lifestyle.",
          popularAreas: [
            { name: "Vijay Nagar", cost: "Medium-High", description: "Vijay Nagar is the most popular student destination. It has upscale amenities, cafes, malls, coaching centers, and is very well connected." },
            { name: "Geeta Bhawan", cost: "Medium", description: "Geeta Bhawan is a commercial and educational zone, close to various colleges and local coaching hubs." },
            { name: "Bhawarkua", cost: "Low-Medium", description: "Bhawarkua is the core student area of Indore, filled with coaching institutes, cheap eateries, libraries, and highly affordable PGs." }
          ],
          costOfLiving: {
            pgRent: "₹4,000 - ₹9,000 per month",
            food: "₹2,500 - ₹4,000 per month (including tiffin services)",
            transport: "₹500 - ₹1,500 per month (local iBus is very affordable)",
            utilities: "₹500 - ₹1,000 per month"
          },
          safetyTips: [
            "Use the Indore iBus system for safe, budget-friendly commuting.",
            "Indore is generally very safe, but avoid isolated streets in Bhawarkua late at night.",
            "Keep emergency contact numbers for Indore Police (100) and Student Helpline handy."
          ]
        },
        {
          city: "Bhopal",
          overview: "Known as the City of Lakes, Bhopal offers a peaceful study environment. It houses institutions like MANIT, AIIMS, and IISER, combining nature with academic life.",
          popularAreas: [
            { name: "MP Nagar", cost: "Medium-High", description: "MP Nagar is the commercial hub, coaching center core, and primary student zone of Bhopal." },
            { name: "Indrapuri", cost: "Low-Medium", description: "Indrapuri is adjacent to MANIT and is highly populated by students looking for affordable shared rooms." },
            { name: "Arera Colony", cost: "High", description: "A posh residential area offering premium, peaceful PGs and flats for students." }
          ],
          costOfLiving: {
            pgRent: "₹3,500 - ₹8,000 per month",
            food: "₹2,200 - ₹3,500 per month",
            transport: "₹600 - ₹1,800 per month (city buses and auto-rickshaws)",
            utilities: "₹400 - ₹800 per month"
          },
          safetyTips: [
            "Avoid walking alone around the lake areas late at night.",
            "Public transport is safe, but agree on fares with auto-rickshaws before boarding.",
            "Emergency number: Bhopal Police Helpdesk (100, 0755-2555500)."
          ]
        },
        {
          city: "Delhi",
          overview: "The capital city is home to prestigious colleges like DU, JNU, and IIT Delhi. It offers a fast-paced metro lifestyle with unparalleled academic resources and diverse cultural hubs.",
          popularAreas: [
            { name: "Hudson Lane / GTB Nagar", cost: "High", description: "Located in North Campus, Hudson Lane is famous for student cafes, lively student community, and premium PGs." },
            { name: "Satya Niketan", cost: "Medium-High", description: "The South Campus student hub, packed with budget eateries, PG options, and DU student energy." },
            { name: "Laxmi Nagar", cost: "Low-Medium", description: "Popular among CA and UPSC aspirants, Laxmi Nagar offers highly affordable housing and local libraries." }
          ],
          costOfLiving: {
            pgRent: "₹6,000 - ₹16,000 per month",
            food: "₹3,500 - ₹6,000 per month",
            transport: "₹1,000 - ₹3,000 per month (Delhi Metro is highly efficient and safe)",
            utilities: "₹1,000 - ₹2,000 per month"
          },
          safetyTips: [
            "Use the Delhi Metro (especially the ladies coach) for late-evening travels.",
            "Avoid poorly lit streets, and use registered cabs (Uber/Ola) for late commutes.",
            "Keep Delhi Women Helpline (1091) and Police (112) programmed in speed dial."
          ]
        },
        {
          city: "Pune",
          overview: "Pune, the Oxford of the East, is a prime educational destination. It is home to Symbiosis, Pune University, and Fergusson College, known for its pleasant weather and rich IT/startup ecosystem.",
          popularAreas: [
            { name: "Viman Nagar", cost: "High", description: "Viman Nagar is close to Symbiosis and offers high-end student living with modern cafes and malls." },
            { name: "Kothrud", cost: "Medium-High", description: "Kothrud is a traditional, clean, and safe neighborhood popular among local and outstation students alike." },
            { name: "Katraj", cost: "Low-Medium", description: "Katraj offers highly affordable, budget student accommodations and local mess services near Bharati Vidyapeeth." }
          ],
          costOfLiving: {
            pgRent: "₹5,000 - ₹11,000 per month",
            food: "₹3,000 - ₹4,500 per month",
            transport: "₹800 - ₹2,000 per month (PMPML buses and local two-wheeler rentals)",
            utilities: "₹600 - ₹1,200 per month"
          },
          safetyTips: [
            "Pune is generally very safe, but renting a scooter is highly recommended for convenient and safe transit.",
            "Respect local residential guidelines regarding late-night noise.",
            "Emergency number: Pune Police helpline (100, 020-26126296)."
          ]
        }
      ]);
      console.log("Seeding complete!");
    }
  } catch (error) {
    console.error("Failed to seed city guides:", error);
  }
};

connectDB().then(() => {
  seedCityGuides();
});

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
app.use("/api/hostels", hostelRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/city-guides", cityGuideRoutes);
app.use("/api/mail", mailRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});