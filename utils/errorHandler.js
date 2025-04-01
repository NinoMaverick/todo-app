const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log error for debugging
  
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Ensure correct status
  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
  });
};
  
module.exports = errorHandler;
  