const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const bcrypt = require("bcrypt");
const collection = require("./config");
const bodyParser = require("body-parser");

// const MONGO_URL = "mongodb://127.0.0.1:27017/Study-website";

// main()
//   .then(() => {
//     console.log("connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.use(bodyParser.json());

// fetch title from html

app.post("/api/sendCourseTitle", (req, res) => {
  const courseTitle = req.body.title;
  console.log(courseTitle); // Do something with the title
  // Store the title or pass it to another route as needed
  res.json({ message: "Title received", title: courseTitle });
});
//

// for main(index-page)
app.get("/index", (req, res) => {
  res.render("listings/index.ejs");
});

// for about us
app.get("/about", (req, res) => {
  res.render("listings/about.ejs");
});

// for redirect to courses
app.get("/courses", (req, res) => {
  res.render("listings/courses.ejs");
});

// for login page
app.get("/login", (req, res) => {
  res.render("listings/login.ejs");
});

//for signup page
app.get("/signup", (req, res) => {
  res.render("listings/signup.ejs");
});
app.get("/sub-courses", (req, res) => {
  res.render("listings/sub-courses.ejs");
});

// Register User
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };
  // check if the user is already in the database
  const existingUser = await collection.findOne({
    name: data.name,
  });
  if (existingUser) {
    res.send("User already exist");
  } else {
    const userdata = await collection.insertMany(data);
    console.log(userdata);
  }
});

// Login user
app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.username });
    if (!check) {
      res.send("User name cann't found");
    }
    const isPassword = await collection.findOne({
      password: req.body.password,
    });
    if (isPassword) {
      res.render("listings/home.ejs");
    } else {
      res.send("Wrong Password");
    }
  } catch {
    res.send("Wrong Details");
  }
});

app.listen(3000, () => {
  console.log("server is listening to port 3000");
});
