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

module.exports = {
  createReview,
  getReviews,
};
