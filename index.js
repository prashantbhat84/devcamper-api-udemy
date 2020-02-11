const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const dotenv = require("dotenv");
//load env variables
dotenv.config({ path: "./config/config.env" });
const router = express.Router();
//mount the  bootcamp router file
app.use("/api/v1/bootcamps", require("./routes/bootcamps"));

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on PORT:${PORT}`);
});
