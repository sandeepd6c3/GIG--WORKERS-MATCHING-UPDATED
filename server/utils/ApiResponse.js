class ApiResponse {
  constructor(statusCode, message, data) {
    this.status = `${statusCode}`.startsWith('2') ? 'success' : 'error';
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  static success(res, message, data = {}) {
    return res.status(200).json(new ApiResponse(200, message, data));
  }

  static created(res, message, data = {}) {
    return res.status(201).json(new ApiResponse(201, message, data));
  }
}

export default ApiResponse;
