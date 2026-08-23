export const sendSuccess = (res, statusCode = 200, message = 'Success', data = null) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

export const sendError = (res, statusCode = 500, message = 'Error occurred') => {
  return res.status(statusCode).json({
    success: false,
    message
  });
};
