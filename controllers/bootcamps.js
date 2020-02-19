const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocode");

//@desc  Get All Bootcamps
//@route   get /api/v1/bootcamps
//@access  public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const reqQuery = { ...req.query };

  //remove fields
  const removeFields = ["select", "sort"];

  //loop over removeFields and delete them from reqQuery;
  removeFields.forEach(param => {
    delete reqQuery[param];
  });

  let queryStr = JSON.stringify(reqQuery);
  //create operators ($gt,$gte,$lt)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  //finding resources
  let query = await Bootcamp.find(JSON.parse(queryStr));

  // query = query.select("name");

  //SELECT FIELDS
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = await Bootcamp.find(JSON.parse(queryStr)).select(fields);
  }
  //sort
  if (req.query.sort) {
    const sorted = req.query.sort.split(",").join(" ");
    query = await Bootcamp.find(JSON.parse(queryStr)).sort(sorted);
  } //else {
  //   query = await Bootcamp.find(JSON.parse(queryStr), { _id: 0 }).sort(
  //     -createdAt
  //   );
  // }

  const bootcamps = await query;

  res.status(200).json({
    status: true,
    count: bootcamps.length,
    data: Object.values(bootcamps)
  });
});

//@desc  Get single Bootcamp
//@route   get /api/v1/bootcamps/:id
//@access  public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const ID = req.params.id;

  const bootcamp = await Bootcamp.findById(ID);
  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp with ID ${ID} has been deleted or does not exist`,
        404
      )
    );
  }

  res.status(200).send({ status: true, data: bootcamp });
});
//@desc  Create  new Bootcamp
//@route   post /api/v1/bootcamps
//@access  private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({ success: true, data: bootcamp });
});
//@desc  update Bootcamp
//@route   put /api/v1/bootcamps/:id
//@access  private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp with ID ${ID} has been deleted or does not exist`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});
//@desc  Delete  Bootcamp
//@route   post /api/v1/bootcamps/:id
//@access  private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp with ID ${ID} has been deleted or does not exist`,
        404
      )
    );
  }
  res.status(200).send({ success: true, data: {} });
});
//@desc Get Bootcamps within a radius
//@route   GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access  private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  const radius = distance / 3963;
  console.log(radius);
  //get latitude and longitude from geocoder
  const loc = geocoder.geocode(zipcode);

  const latitude = loc[0].latitude;
  const longitude = loc[0].longitude;

  //cal the radius radians
  //divide the distance by radius
  //radius of the earth =3963 mi

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[longitude, latitude], radius] } }
  });
  res
    .status(200)
    .json({ count: bootcamps.length, success: true, data: bootcamps });
});
