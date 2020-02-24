const express = require("express");
const app = express();
const cookie = require("cookie-parser");
//body parser
app.use(express.json());
const connectdb = require("./config/db"); // connect to mongodb
const colors = require("colors");
const errorHandler = require("./middleware/error");
const fileUpload = require("express-fileupload");

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
connectdb();
// use the logger middleware in development mode only.

if (process.env.NODE_ENV === "development") {
  //log http requests to a txt file
  // app.use(morgan("combined", { stream: accessLogStream }));
  app.use(morgan("dev"));
}
//file upload
app.use(fileUpload());
//cookie parser
app.use(cookie());
//set static folder
app.use(express.static(path.join(__dirname, "public")));

//mount the  resource router file
app.use("/api/v1/bootcamps", require("./routes/bootcamp"));
app.use("/api/v1/courses", require("./routes/course"));
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/users", require("./routes/users"));

//error handler
app.use(errorHandler);

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
