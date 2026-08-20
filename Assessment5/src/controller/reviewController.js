const reviewService = require("../service/reviewService");

const createReview = async (req, res, next) => {
  try {
    const review = await reviewService.createReview(req.body);
    res.status(201).json({ success: true, message: "Review created", data: review });
  } catch (err) {
    next(err);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const result = await reviewService.getReviews(req.query);
    res.status(200).json({ success: true, message: "Reviews fetched", data: result });
  } catch (err) {
    next(err);
  }
};

const getReviewById = async (req, res, next) => {
  try {
    const review = await reviewService.getReviewById(req.params.id);
    res.status(200).json({ success: true, message: "Review fetched", data: review });
  } catch (err) {
    next(err);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const review = await reviewService.updateReview(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Review updated", data: review });
  } catch (err) {
    next(err);
  }
};

const approveReview = async (req, res, next) => {
  try {
    const review = await reviewService.approveReview(req.params.id);
    res.status(200).json({ success: true, message: "Review approved", data: review });
  } catch (err) {
    next(err);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    await reviewService.deleteReview(req.params.id);
    res.status(200).json({ success: true, message: "Review deleted", data: null });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  approveReview,
  deleteReview,
};
