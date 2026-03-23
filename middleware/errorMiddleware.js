const errorHandler = (err, req, res, next) => {
  // If we didn't set a specific status code, default to 500 (Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    // Stack trace helps you find the line number during coding
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// Also good to have a 'Not Found' handler for 404s
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { errorHandler, notFound };
