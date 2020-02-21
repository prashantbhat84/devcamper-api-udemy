const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
//@desc  get all bootcamps
//@method   GET /api/v1/bootcamps
//@access   public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res
      .status(200)
      .json({ success: true, count: bootcamps.length, data: bootcamps });
  } catch (error) {
    next(error);
  }
};

//@desc  get specific bootcamp
//@method   GET /api/v1/bootcamps/:id
//@access   public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp with ID :${req.params.id} does not exist `,
          404
        )
      );
    }
    res.status(200).json({
      success: true,

      data: bootcamp
    });
  } catch (error) {
    next(error);
  }
};
//@desc  Create New bootcamp
//@method   POST /api/v1/bootcamps
//@access   private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error);
  }
};

//@desc  update specific bootcamp
//@method   PUT /api/v1/bootcamps/:id
//@access   private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp with ID :${req.params.id} does not exist `,
          404
        )
      );
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    // res.status(400).json({
    //   success: false,
    //   msg: "Bootcamp update error",
    //   errormessage: error.message
    // });
    next(error);
  }
};
//@desc  delete specific bootcamp
//@method   PUT /api/v1/bootcamps/:id
//@access   private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp with ID :${req.params.id} does not exist `,
          404
        )
      );
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    // res.status(400).json({
    //   success: false,
    //   msg: "Bootcamp delete error",
    //   errormessage: error.message
    // });
    next(error);
  }
};
