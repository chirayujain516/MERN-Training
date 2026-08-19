const reviewService = require("../service/reviewService");

const createReview = async (req, res) => {
  try {
    const review = await reviewService.createReview(req.body);
    res.status(201).send({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getReviews(req.query);
    res.status(200).send({
      success: true,
      message: "Reviews fetched successfully",
      data: reviews,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const getSingleReview = async (req, res) => {
  try {
    const review = await reviewService.getSingleReview(req.params.id);
    res.status(200).send({
      success: true,
      message: "Review fetched successfully",
      data: review,
    });
  } catch (err) {
    res.status(err.statusCode || 500).send({
      success: false,
      message: err.message,
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await reviewService.updateReview(req.params.id, req.body);
    res.status(200).send({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (err) {
    res.status(err.statusCode || 500).send({
      success: false,
      message: err.message,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await reviewService.deleteReview(req.params.id);
    res.status(200).send({
      success: true,
      message: "Review deleted successfully",
      data: review,
    });
  } catch (err) {
    res.status(err.statusCode || 500).send({
      success: false,
      message: err.message,
    });
  }
};

const approveReview = async (req, res) => {
  try {
    const review = await reviewService.approveReview(req.params.id);
    res.status(200).send({
      success: true,
      message: "Review approved successfully",
      data: review,
    });
  } catch (err) {
    res.status(err.statusCode || 500).send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createReview,
  getReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  approveReview,
};
