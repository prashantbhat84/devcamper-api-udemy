const Bootcamp = require("../models/Bootcamp");

//@desc  Get All Bootcamps
//@route   get /api/v1/bootcamps
//@access  public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    console.log(Object.values(bootcamps).length);

    res.status(200).json({ status: true, data: Object.values(bootcamps) });
  } catch (error) {
    res.status(400).json({ status: false });
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
      return res
        .status(404)
        .send({ message: "This Bootcamp does not exist or has been deleted" });
    }

    res.status(200).send({ status: true, data: bootcamp });
  } catch (error) {
    res.status(400).json({ status: false });
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
    res.status(400).send({ success: false });
  }
};
//@desc  update Bootcamp
//@route   put /api/v1/bootcamps/:id
//@access  private
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .send({ status: true, message: `Update bootcamp with id${req.params.id}` });
};
//@desc  Delete  Bootcamp
//@route   post /api/v1/bootcamps/:id
//@access  private
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .send({ status: true, message: `Delete bootcamp ${req.params.id}` });
};
