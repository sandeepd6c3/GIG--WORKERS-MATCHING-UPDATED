import ApiError from '../utils/ApiError.js';

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode || 500;

  // Log error in development environment
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  // Mongoose bad ObjectId (CastError)
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid ${err.path}: ${err.value}`;
    error = new ApiError(404, message);
  }

  // Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    const message = `Duplicate value entered for '${field}'. Please use another value.`;
    error = new ApiError(400, message);
  }

  // Mongoose schema validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message).join(', ');
    error = new ApiError(400, message);
  }

  // JWT invalid token error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token signature. Access denied.';
    error = new ApiError(401, message);
  }

  // JWT expired token error
  if (err.name === 'TokenExpiredError') {
    const message = 'Token has expired. Please log in again.';
    error = new ApiError(401, message);
  }

  res.status(error.statusCode || 500).json({
    status: error.status || 'error',
    statusCode: error.statusCode || 500,
    message: error.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

