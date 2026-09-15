import { authenticateWithGoogle } from '../services/googleAuthService.js';

/**
 * Controller handling Google OAuth authentication
 * POST /api/v1/auth/google
 */
export const handleGoogleAuth = async (req, res, next) => {
  try {
    const { credential, role } = req.body;
    const result = await authenticateWithGoogle({ credential, role });

    if (result.requiresRoleSelection) {
      return res.status(200).json(result);
    }

    const statusCode = result.workerProfile || result.message?.includes('created') ? 201 : 200;
    return res.status(statusCode).json(result);
  } catch (error) {
    next(error);
  }
};
