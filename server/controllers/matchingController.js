import { rankMatchingWorkers } from '../services/matchingService.js';

/**
 * @route POST /api/v1/matching/workers
 * @desc Get AI-ranked matched workers based on customer requirements
 * @access Public / Protected
 */
export const matchWorkers = async (req, res, next) => {
  try {
    const { service, description, location, date, budget, experienceRequired } = req.body || {};

    if (!service && !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least a service title or description for matching'
      });
    }

    const matches = await rankMatchingWorkers({
      service,
      description,
      location,
      date,
      budget,
      experienceRequired
    });

    return res.status(200).json({
      success: true,
      count: matches.length,
      matches
    });
  } catch (error) {
    next(error);
  }
};
