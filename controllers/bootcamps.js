const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

//@desc  Get All Bootcamps
//@route   get /api/v1/bootcamps
//@access  public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();

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
