const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const bcrypt = require("bcrypt");

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define the user schema and model
const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Routes

// Home Route
app.get("/", (req, res) => {
  res.render("listings/index");
});

app.get("/index", (req, res) => {
  res.render("listings/index.ejs");
});

app.get("/courses", (req, res) => {
  res.render("listings/courses.ejs");
});

app.get("/login", (req, res) => {
  res.render("listings/login.ejs");
});

app.get("/signup", (req, res) => {
  res.render("listings/signup.ejs");
});

app.get("/jee", (req, res) => {
  res.render("listings/jee.ejs");
});

app.get("/gate", (req, res) => {
  res.render("listings/gate.ejs");
});

app.get("/jee#sample_papers", (req, res) => {
  res.render("listings/jee#sample_papers");
});

app.get("/quiz", (req, res) => {
  res.render("listings/quiz");
});

app.get("/cse", (req, res) => {
  res.render("listings/cse");
});

app.get("/cse#data", (req, res) => {
  res.render("listings/cse#data");
});

app.get("/cse#algo", (req, res) => {
  res.render("listings/cse#algo");
});

app.get("/cse#projects", (req, res) => {
  res.render("listings/cse#projects");
});

// Register User
app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const existingUser = await User.findOne({ name: username });

    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: username,
      password: hashedPassword,
      email: email,
    });

    await newUser.save();
    res.status(201).render("listings/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Login user
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ name: username });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // req.session.username = username;
      res.status(200).render("listings/index.ejs");
    } else {
      res.status(400).send("Wrong Password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
