import { validationResult } from 'express-validator';
import ApiError from '../utils/ApiError.js';

export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = errors.array().map((err) => `${err.path}: ${err.msg}`);
    next(ApiError.badRequest(extractedErrors.join(', ')));
  };
};
