const errorHandler = (err, req, res, next) => {
  //log console for dev
  console.log("error");
  console.error(err.stack.red);
  res.status(500).json({ success: false, error: err.message });
};
module.exports = errorHandler;
