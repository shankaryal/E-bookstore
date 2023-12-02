const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const bookroute = require("./src/routes/bookroute");
const userroute = require("./src/routes/userroute");
const commentroute = require("./src/routes/commentroute");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/image", express.static(path.join(__dirname, "public/image")));
app.use("/pdf", express.static(path.join(__dirname, "public/pdf")));
// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Backend is working !!");
});

// Routes setup
// const authRoutes = require('./routes/authRoutes');
// const bookRoutes = require('./routes/bookRoutes');
// const addBookRoutes = require('./routes/addBookRoutes');
// app.use('/api/auth', authRoutes);
app.use("/books", bookroute);
app.use("/users", userroute);
app.use("/comments", commentroute);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
