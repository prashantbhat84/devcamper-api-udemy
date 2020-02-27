const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//load env variables;
dotenv.config({ path: "./config/config.env" });

//load models

const bootcamp = require("./models/Bootcamp");
const Course = require("./models/Course");
const User = require("./models/User");
const Review = require("./models/Review");
// connect to db
mongoose
  .connect(process.env.Mongo_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connected");
    if (process.argv[2] === "-i") {
      importdata();
    } else if (process.argv[2] === "-d") {
      deletedata();
    }
  })
  .catch(e => {
    console.log("error");
    process.exit(1);
  });

//read  json files
const bootcamps = JSON.parse(
  fs.readFileSync(
    "./devcamper-project-resources/devcamper_project_resources/_data/bootcamps.json",
    "utf-8"
  )
);
const courses = JSON.parse(
  fs.readFileSync(
    "./devcamper-project-resources/devcamper_project_resources/_data/courses.json",
    "utf-8"
  )
);
const users = JSON.parse(
  fs.readFileSync(
    "./devcamper-project-resources/devcamper_project_resources/_data/users.json",
    "utf-8"
  )
);
const reviews = JSON.parse(
  fs.readFileSync(
    "./devcamper-project-resources/devcamper_project_resources/_data/reviews.json",
    "utf-8"
  )
);
//Import data to db
const importdata = async () => {
  try {
    await bootcamp.create(bootcamps);
    await Course.create(courses);
    await User.create(users);
    await Review.create(reviews);
    await console.log("Data imported to DB...".green.inverse.bold);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};
//delete data from db
const deletedata = async () => {
  try {
    await bootcamp.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log("Data deleted from DB...".red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};
