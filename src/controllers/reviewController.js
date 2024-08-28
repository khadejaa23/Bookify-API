const Review = require('../models/review');

exports.getAllReviews = async (req, res) => {
  const reviews = await Review.find().populate('user book');
  res.json(reviews);
};

exports.getReviewById = async (req, res) => {
  const review = await Review.findById(req.params.id).populate('user book');
  if (!review) return res.status(404).send('Review not found');
  res.json(review);
};

exports.createReview = async (req, res) => {
  const review = new Review(req.body);
  await review.save();
  res.status(201).json(review);
};

exports.updateReview = async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!review) return res.status(404).send('Review not found');
  res.json(review);
};

exports.deleteReview = async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) return res.status(404).send('Review not found');
  res.status(204).send();
};