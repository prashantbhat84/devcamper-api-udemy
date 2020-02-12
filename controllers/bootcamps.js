const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");

//@desc  Get All Bootcamps
//@route   get /api/v1/bootcamps
//@access  public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    res.status(200).json({
      status: true,
      count: bootcamps.length,
      data: Object.values(bootcamps)
    });
  } catch (error) {
    next(error);
  }
};

//@desc  Get single Bootcamp
//@route   get /api/v1/bootcamps/:id
//@access  public
exports.getBootcamp = async (req, res, next) => {
  const ID = req.params.id;
  try {
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
  } catch (err) {
    // next(new ErrorResponse(`Bootcamp not found with ID :${ID}`, 404));
    next(err);
  }
};
//@desc  Create  new Bootcamp
//@route   post /api/v1/bootcamps
//@access  private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({ success: true, data: bootcamp });
  } catch (error) {
    next(error);
  }
};
//@desc  update Bootcamp
//@route   put /api/v1/bootcamps/:id
//@access  private
exports.updateBootcamp = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};
//@desc  Delete  Bootcamp
//@route   post /api/v1/bootcamps/:id
//@access  private
exports.deleteBootcamp = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};
