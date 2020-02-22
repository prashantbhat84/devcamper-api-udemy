const advancedResults = (model, populate) => async (req, res, next) => {
  let query;
  // create a copy of req.query
  const reqQuery = { ...req.query };

  //Fields to exclude
  const removeFileds = ["select", "sort", "limit", "page"];
  //loop over remove fields and delete them from req query
  removeFileds.forEach(field => delete reqQuery[field]); //  remove certain items from array

  //create a query string
  let queryStr = JSON.stringify(reqQuery);
  // create operators like $gt $lte etc
  queryStr = queryStr.replace(/\b(gt|lt|lte|gte|in)\b/g, match => `$${match}`);
  //Finding resource
  query = model.find(JSON.parse(queryStr));

  //select Fields

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }
  //sort
  if (req.query.sort) {
    const sortby = req.query.sort.split(",").join(" ");
    query = query.sort(sortby);
  } else {
    query = query.sort("-createdAt");
  }
  //Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();
  query = query.skip(startIndex).limit(limit);
  if (populate) {
    query = query.populate(populate);
  }

  //Executing Query
  const results = await query;

  //Pagination Result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results
  };
  next();
};
module.exports = advancedResults;
