const express = require("express");
const router = express.Router();

const reviewController = require("../controller/reviewController");
const validationMiddleware = require("../middleware/validationMiddleware");
const {
  createReviewSchema,
  getReviewsSchema,
  reviewIdSchema,
  updateReviewSchema,
} = require("../validationSchema/reviewValidationSchema");

router.post(
  "/createReview",
  validationMiddleware(createReviewSchema), // body (default)
  reviewController.createReview
);

router.get(
  "/getReviews",
  validationMiddleware(getReviewsSchema, "query"),
  reviewController.getReviews
);

router.get(
  "/getSingleReview/:id",
  validationMiddleware(reviewIdSchema, "params"),
  reviewController.getReviewById
);

router.patch(
  "/updateReview/:id",
  validationMiddleware(reviewIdSchema, "params"),
  validationMiddleware(updateReviewSchema, "body"),
  reviewController.updateReview
);

router.patch(
  "/:id/approve",
  validationMiddleware(reviewIdSchema, "params"),
  reviewController.approveReview
);

router.delete(
  "/deleteReview/:id",
  validationMiddleware(reviewIdSchema, "params"),
  reviewController.deleteReview
);

module.exports = router;
