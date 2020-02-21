const express = require("express");
const app = express();
//body parser
app.use(express.json());
const connectdb = require("./config/db"); // connect to mongodb
const colors = require("colors");
// const errorHandler = require("./middleware/error");

//const port = process.env.PORT || 5000;
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
// create a write stream (in append mode)
let accessLogStream = fs.createWriteStream(path.join(__dirname, "access.txt"), {
  flags: "a"
});

const dotenv = require("dotenv");
//load env variables
dotenv.config({ path: "./config/config.env" });
const router = express.Router();
// connect to mongodb atlas
// connectdb();
// use the logger middleware in development mode only.

if (process.env.NODE_ENV === "development") {
  // app.use(morgan("combined", { stream: accessLogStream }));
  app.use(morgan("dev"));
}

//mount the  resource router file
app.use("/api/v1/bootcamps", require("./routes/bootcamp"));

//error handler
// app.use(errorHandler);

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} on PORT:${process.env.PORT ||
      5000}`.yellow.bold
  );
});

//Handle unhandled rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`DB rejection :${err.message}`.red);
  //close server and exit process
  server.close(() => process.exit(1));
});
