const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Database
require("./config/db");

// Routes
const evidenceRoutes = require("./routes/evidenceRoutes");
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(cors());
app.use(express.json());


// Home Route
app.get("/", (req, res) => {
    res.send("Evidence Verification Backend Running");
});

// API Routes
app.use("/api/evidence", evidenceRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
const path = require("path");

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);