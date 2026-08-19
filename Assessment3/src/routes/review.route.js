const express = require("express");

const router = express.Router();

const reviewController = require("../controller/reviewController");

const validationMiddleware = require("../middleware/validationMiddleware");

const {
  createReviewSchema,
  getReviewsSchema,
} = require("../validationSchema/reviewValidationSchema");

router.post(
  "/createReview",
  validationMiddleware(createReviewSchema),
  reviewController.createReview,
);

router.get(
  "/getReviews",
  validationMiddleware(getReviewsSchema, "query"),
  reviewController.getReviews,
);

module.exports = router;
