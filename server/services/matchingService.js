import mongoose from 'mongoose';
import Worker from '../models/Worker.js';
import { DEFAULT_VERIFIED_WORKERS } from '../utils/defaultWorkers.js';

/**
 * Normalizes string for keyword matching
 */
const cleanText = (str = '') => str.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim();

/**
 * Calculates matching score between customer request and a worker profile
 * 
 * Weights:
 * - Skill/Service match: 35%
 * - Location match: 20%
 * - Availability match: 15%
 * - Rating match: 10%
 * - Experience match: 10%
 * - Budget/Price compatibility: 10%
 */
export const calculateMatchScore = (worker, requirements) => {
  const {
    service = '',
    description = '',
    location = '',
    date,
    budget,
    experienceRequired
  } = requirements;

  // 1. Skill & Service Match (35%)
  const queryTokens = new Set([
    ...cleanText(service).split(/\s+/).filter(Boolean),
    ...cleanText(description).split(/\s+/).filter(Boolean)
  ]);

  const workerSearchCorpus = cleanText(
    `${worker.title || ''} ${worker.categoryName || ''} ${(worker.skills || []).join(' ')} ${worker.bio || ''}`
  );

  let skillPoints = 0;
  if (queryTokens.size > 0) {
    let matchedTokens = 0;
    queryTokens.forEach(token => {
      if (token.length > 2 && workerSearchCorpus.includes(token)) {
        matchedTokens++;
      }
    });

    // Exact title or category match grants bonus/max points
    const cleanCategory = cleanText(worker.categoryName);
    const cleanTitle = cleanText(worker.title);
    const cleanService = cleanText(service);

    if (cleanService && (cleanCategory.includes(cleanService) || cleanTitle.includes(cleanService) || cleanService.includes(cleanCategory))) {
      skillPoints = 100;
    } else {
      const matchRatio = matchedTokens / queryTokens.size;
      skillPoints = Math.min(100, Math.round(matchRatio * 100));
    }
  } else {
    skillPoints = 80;
  }

  // 2. Location Match (20%)
  let locationPoints = 50; // Default baseline if unspecified
  if (location && location.trim()) {
    const targetLoc = cleanText(location);
    const workerLoc = cleanText(worker.location || '');
    if (workerLoc.includes(targetLoc) || targetLoc.includes(workerLoc)) {
      locationPoints = 100;
    } else {
      // Partial word overlap
      const locWords = targetLoc.split(/\s+/).filter(Boolean);
      const hasOverlap = locWords.some(w => workerLoc.includes(w));
      locationPoints = hasOverlap ? 80 : 30;
    }
  } else {
    locationPoints = 100;
  }

  // 3. Availability Match (15%)
  let availabilityPoints = 0;
  if (worker.isAvailable) {
    availabilityPoints = 100;
  } else {
    availabilityPoints = 20;
  }

  // 4. Rating & Reviews Match (10%)
  // Rating 5.0 -> 100, 4.0 -> 80, etc.
  const rawRating = Number(worker.averageRating) || 4.5;
  const ratingPoints = Math.min(100, Math.round((rawRating / 5.0) * 100));

  // 5. Experience Match (10%)
  const workerExp = Number(worker.experienceYears) || 5;
  let experiencePoints = 80;
  if (experienceRequired) {
    const reqExp = Number(experienceRequired);
    if (workerExp >= reqExp) {
      experiencePoints = 100;
    } else {
      experiencePoints = Math.max(20, Math.round((workerExp / reqExp) * 100));
    }
  } else {
    // Standard scaling based on experience tiers (up to 10 years = 100%)
    experiencePoints = Math.min(100, Math.round(Math.max(50, (workerExp / 10) * 100)));
  }

  // 6. Budget / Price Compatibility (10%)
  let pricePoints = 85;
  const workerRate = Number(worker.hourlyRate) || 50;
  if (budget && Number(budget) > 0) {
    const targetBudget = Number(budget);
    if (workerRate <= targetBudget) {
      pricePoints = 100;
    } else {
      // Penalty proportional to budget exceeded
      const ratio = targetBudget / workerRate;
      pricePoints = Math.max(10, Math.round(ratio * 100));
    }
  } else {
    pricePoints = 85;
  }

  // Final Weighted Calculation
  const totalScore = Math.round(
    (skillPoints * 0.35) +
    (locationPoints * 0.20) +
    (availabilityPoints * 0.15) +
    (ratingPoints * 0.10) +
    (experiencePoints * 0.10) +
    (pricePoints * 0.10)
  );

  return {
    matchScore: Math.min(100, Math.max(0, totalScore)),
    breakdown: {
      skill: skillPoints,
      location: locationPoints,
      availability: availabilityPoints,
      rating: ratingPoints,
      experience: experiencePoints,
      price: pricePoints
    }
  };
};

/**
 * Finds and ranks verified workers matching customer request
 */
export const rankMatchingWorkers = async (requirements = {}) => {
  let eligibleWorkers = [];

  try {
    // Only query Mongo if connected (readyState === 1)
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      const filter = {
        isVerified: { $ne: false }
      };
      eligibleWorkers = await Worker.find(filter).populate('userId', 'name email phone avatar').maxTimeMS(2000);
    }
  } catch (err) {
    eligibleWorkers = [];
  }

  // Fallback to default verified dataset if database is offline or empty
  if (!eligibleWorkers || eligibleWorkers.length === 0) {
    eligibleWorkers = DEFAULT_VERIFIED_WORKERS.filter(w => w.isVerified !== false);
  }

  const ranked = eligibleWorkers.map(worker => {
    const { matchScore, breakdown } = calculateMatchScore(worker, requirements);
    return {
      worker,
      matchScore,
      breakdown
    };
  });

  // Sort descending by match score
  ranked.sort((a, b) => b.matchScore - a.matchScore);

  return ranked;
};

export const findMatchingWorkers = async (requirements) => {
  return await rankMatchingWorkers(requirements);
};

export default {
  calculateMatchScore,
  rankMatchingWorkers,
  findMatchingWorkers
};
