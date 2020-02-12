const express = require("express");
const app = express();
const connectdb = require("./config/db"); // connect to mongodb

//const port = process.env.PORT || 5000;
const morgan = require("morgan");

const dotenv = require("dotenv");
//load env variables
dotenv.config({ path: "./config/config.env" });
const router = express.Router();
// connect to mongodb atlas
connectdb();
// use the logger middleware in development mode only.

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//mount the  bootcamp router file
app.use("/api/v1/bootcamps", require("./routes/bootcamps"));

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} on PORT:${process.env.PORT ||
      5000}`
  );
});

//Handle unhandled rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`DB rejection :${err.message}`);
  //close server and exit process
  server.close(() => process.exit(1));
});
