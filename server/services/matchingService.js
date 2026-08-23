import Worker from '../models/Worker.js';

export const findMatchingWorkers = async ({ category, query }) => {
  const filter = { isAvailable: true };
  if (category) {
    filter.categoryName = { $regex: category, $options: 'i' };
  }
  return await Worker.find(filter).sort({ averageRating: -1, completedJobs: -1 });
};
