import Review from '../models/Review.js';

export const createReview = async (req, res) => {
  const review = await Review.create({
    customerId: req.user._id,
    customerName: req.user.name,
    ...req.body
  });
  res.status(201).json(review);
};

export const getWorkerReviews = async (req, res) => {
  const reviews = await Review.find({ workerId: req.params.workerId });
  res.json(reviews);
};
