import { sendOTP, verifyOTP } from '../services/otpService.js';

export const handleSendOTP = async (req, res, next) => {
  try {
    const result = await sendOTP(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const handleVerifyOTP = async (req, res, next) => {
  try {
    const result = await verifyOTP(req.body);
    const statusCode = req.body.purpose === 'signup' ? 201 : 200;
    res.status(statusCode).json(result);
  } catch (error) {
    next(error);
  }
};
