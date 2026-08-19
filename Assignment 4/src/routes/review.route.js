const express = require("express");

const router = express.Router();

const reviewController = require("../controller/reviewController");

const validationMiddleware = require("../middleware/validationMiddleware");

const {
  createReviewSchema,
  getReviewsSchema,
  reviewIdSchema,
  updateReviewSchema
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

router.get(
  "/getSingleReview/:id",
  validationMiddleware(reviewIdSchema, "params"),
  reviewController.getSingleReview,
);

router.patch(
  "/updateReview/:id",
  validationMiddleware(reviewIdSchema, "params"),
  validationMiddleware(updateReviewSchema),
  reviewController.updateReview,
);

router.delete(
  "/deleteReview/:id",
  validationMiddleware(reviewIdSchema, "params"),
  reviewController.deleteReview,
);

router.patch(
  "/:id/approve",
  validationMiddleware(reviewIdSchema, "params"),
  reviewController.approveReview,
);

module.exports = router;
