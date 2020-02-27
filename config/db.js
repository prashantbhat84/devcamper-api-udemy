const mongoose = require("mongoose");

const connectdb = async () => {
  const connection = await mongoose.connect(process.env.Mongo_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  console.log(
    `Mongodb connected:${connection.connection.host} `.cyan.underline.bold
  );
};
module.exports = connectdb;
