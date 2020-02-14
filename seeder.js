const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//load env variables;
dotenv.config({ path: "./config/config.env" });

//load models

const bootcamp = require("./models/Bootcamp");

// connect to db
mongoose.connect(process.env.Mongo_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

//read  json files
const bootcamps = JSON.parse(
  fs.readFileSync(
    "./devcamper-project-resources/devcamper_project_resources/_data/bootcamps.json",
    "utf-8"
  )
);
//Import data to db
const importdata = async () => {
  try {
    await bootcamp.create(bootcamps);
    console.log("Data imported to DB...".green.inverse.bold);
    process.exit();
  } catch (error) {
    console.error(e);
  }
};
//delete data from db
const deletedata = async () => {
  try {
    await bootcamp.deleteMany();
    console.log("Data deleted from DB...".red.inverse);
    process.exit();
  } catch (error) {
    console.error(e);
  }
};
if (process.argv[2] === "-i") {
  importdata();
} else if (process.argv[2] === "-d") {
  deletedata();
}
