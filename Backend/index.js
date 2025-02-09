const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Store data
const userData = [];

// POST: Save form data (Sign Up)
app.post("/signup", (req, res) => {
  const { email, username, password, confirmPassword, name } = req.body;

  if (!email || !username || !password || !confirmPassword || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = userData.some((user) => user.username === username);
  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  userData.push({ email, username, password, name });
  console.log("User registered:", userData);
  res.status(201).json({ message: "User registered successfully" });
});

// POST: Verify login credentials
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = userData.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  console.log("User logged in:", user);
  res.status(200).json({ message: "Login successful", user });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
