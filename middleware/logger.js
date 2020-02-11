const logger = (req, res, next) => {
  console.log(req);
  console.log(
    `method: ${req.method}// :${req.protocol} host:${req.get("host")}, url:${
      req.originalUrl
    }`
  );

  next();
};
module.exports = logger;
