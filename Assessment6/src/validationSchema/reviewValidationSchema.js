const Joi = require("joi");

const objectId = Joi.string().hex().length(24).message("Invalid MongoDB ObjectId");

const createReviewSchema = Joi.object({
  title: Joi.string().trim().min(3).max(80).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters long",
    "string.max": "Title cannot exceed 80 characters",
  }),
  comment: Joi.string().trim().min(10).max(500).required().messages({
    "string.empty": "Comment is required",
    "string.min": "Comment must be at least 10 characters long",
    "string.max": "Comment cannot exceed 500 characters",
  }),
  rating: Joi.number().integer().min(1).max(5).required().messages({
    "number.base": "Rating is required",
    "number.integer": "Rating must be a whole number",
    "number.min": "Rating must be at least 1",
    "number.max": "Rating cannot be more than 5",
  }),
  reviewerName: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Reviewer name is required",
    "string.min": "Reviewer name must be at least 2 characters long",
    "string.max": "Reviewer name cannot exceed 50 characters",
  }),
});

const getReviewsSchema = Joi.object({
  status: Joi.string().valid("pending", "approved", "rejected"),
  minRating: Joi.number().min(1).max(5),
  // Bonus: maxRating must always be greater than minRating
  maxRating: Joi.number().min(1).max(5).greater(Joi.ref("minRating")).messages({
    "number.greater": "maxRating must be greater than minRating",
  }),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(20).default(10),
  sortBy: Joi.string().valid("rating:desc", "rating:asc", "createdAt:desc", "createdAt:asc"),
});

const reviewIdSchema = Joi.object({
  id: objectId.required(),
});

const updateReviewSchema = Joi.object({
  title: Joi.string().trim().min(3).max(80),
  comment: Joi.string().trim().min(10).max(500),
  rating: Joi.number().integer().min(1).max(5),
  reviewerName: Joi.string().trim().min(2).max(50),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required to update",
  });

module.exports = {
  createReviewSchema,
  getReviewsSchema,
  reviewIdSchema,
  updateReviewSchema,
};
