const express = require("express");
const path = require("path");

const app = express();

// PORT
const PORT = process.env.PORT || 3000;

// JSON support
app.use(express.json());

// 🔥 FIXED FRONTEND PATH
const FRONTEND_PATH = path.join(process.cwd(), "frontend");

// Serve static files
app.use(express.static(FRONTEND_PATH));

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running properly 🚀" });
});

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(FRONTEND_PATH, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});