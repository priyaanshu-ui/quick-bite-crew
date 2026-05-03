const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// JSON
app.use(express.json());

// ❗ FIX: frontend backend के बाहर है
const FRONTEND_PATH = path.join(__dirname, "../frontend");

// static
app.use(express.static(FRONTEND_PATH));

// route
app.get("/", (req, res) => {
  res.sendFile(path.join(FRONTEND_PATH, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});