const mongoose = require("mongoose");
const slugify = require("slugify"); //  package to create a slug
const GeoCoder = require("../utils/geocode"); // geocode  utility  to get information

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Description is required"],
    unique: true,
    trim: true,
    maxlength: [50, "Name should have a max length of 50 chars"]
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Description field cannot be blank"],

    maxlength: [500, "Description should have a max length of 500 chars"]
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid URL with HTTP or HTTPS"
    ]
  },
  phone: {
    type: String,
    maxlength: [20, "Phone number can not be longer than 20 characters"]
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email"
    ]
  },
  address: {
    type: String,
    required: [true, "Please add an address"]
  },
  location: {
    //GeoJSON point
    type: {
      type: String,
      enum: ["Point"],
      required: false
    },
    coordinates: {
      type: [Number],
      required: false,
      index: "2dsphere"
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },

  careers: {
    // Array of strings
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other"
    ]
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must can not be more than 10"]
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "no-photo.jpg"
  },
  housing: {
    type: Boolean,
    default: false
  },
  jobAssistance: {
    type: Boolean,
    default: false
  },
  jobGuarantee: {
    type: Boolean,
    default: false
  },
  acceptGi: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
// create bootcamp slug from name
BootcampSchema.pre("save", function(next) {
  console.log("Slugify Ran", this.name);
  this.slug = slugify(this.name, { lower: true });
  console.log(this.slug);
  next();
});
//Geocode and create location  field
BootcampSchema.pre("save", async function(next) {
  try {
    const loc = await GeoCoder.geocode(this.address);
    this.location = {
      type: "Point",
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress,
      street: loc[0].streetName,
      city: loc[0].city,
      state: loc[0].stateCode,
      zipcode: loc[0].zipcode,
      country: loc[0].countryCode
    };
  } catch (error) {
    return next(error);
  }
  //Do not save address in DB.
  this.address = undefined;

  next();
});
module.exports = mongoose.model("Bootcamp", BootcampSchema);
