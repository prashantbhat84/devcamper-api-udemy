const NodeGeocoder = require("node-geocoder");
const options = {
  provider: process.env.GeoCoder_Provider,
  httpAdapter: "https",
  apiKey: process.env.GeoCoder_API_Key,
  formatter: null
};
let geocoder = NodeGeocoder(options);
module.exports = geocoder;
