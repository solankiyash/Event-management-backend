const express = require("express");
const cors = require("cors");
const connectDb = require("./DB/db.js");
const dotenv = require("dotenv");

const userroutes = require("./routes/userroutes.js");
const eventRoutes = require("./routes/eventroutes.js");

dotenv.config();
const app = express();

connectDb();
app.use(express.json());
// app.use(cors())

// cors for sequrity allow
app.use(
  cors({
    origin: ["http://localhost:5173", "https://eventmanagement-q4dou6k5z-yashs-projects-172d3df6.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("connecting...");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// for routes

app.use("/api/auth", userroutes);
app.use("/api/events", eventRoutes);
