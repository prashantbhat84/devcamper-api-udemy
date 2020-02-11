const express = require("express");
const app = express();
//const port = process.env.PORT || 5000;
const morgan = require("morgan");

const dotenv = require("dotenv");
//load env variables
dotenv.config({ path: "./config/config.env" });
const router = express.Router();
// use the logger middleware in development mode only.
console.log(process.env.PORT || 5000);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//mount the  bootcamp router file
app.use("/api/v1/bootcamps", require("./routes/bootcamps"));

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} on PORT:${process.env.PORT ||
      5000}`
  );
});
