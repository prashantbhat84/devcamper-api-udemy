const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocode");

//@desc  Get All Bootcamps
//@route   get /api/v1/bootcamps
//@access  public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query = await Bootcamp.find();
  const reqQuery = { ...req.query };
  const removefields = ["page", "limit"];
  removefields.forEach(param => delete reqQuery[param]);

  //pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = Bootcamp.countDocuments();

  query = await Bootcamp.find()
    .skip(startIndex)
    .limit(limit);

  const bootcamps = await query;

  //pagination result
  let pagination = {};

  if (endIndex <= total) {
    pagination.next = {
      page: page + 1,
      limit: limit
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    status: true,
    count: bootcamps.length,
    pagination,
    data: Object.values(bootcamps)
  });
});

//@desc  Get single Bootcamp
//@route   get /api/v1/bootcamps/:id
//@access  public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  console.log("req");
  console.log(req.query);
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
