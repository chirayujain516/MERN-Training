const Joi = require("joi");

const createReviewSchema = Joi.object({
  title: Joi.string().trim().min(3).max(80).required(),

  comment: Joi.string().trim().min(10).max(500).required(),

  rating: Joi.number().integer().min(1).max(5).required(),

  reviewerName: Joi.string().trim().min(2).max(50).required(),
}).options({
  stripUnknown: true,
});

const getReviewsSchema = Joi.object({
  status: Joi.string().valid("pending", "approved", "rejected"),

  minRating: Joi.number().min(1).max(5),

  page: Joi.number().integer().min(1).default(1),

  limit: Joi.number().integer().min(1).max(20).default(10),
});

const reviewIdSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const updateReviewSchema = Joi.object({
  title: Joi.string().trim().min(3).max(80),

  comment: Joi.string().trim().min(10).max(500),

  rating: Joi.number().integer().min(1).max(5),

  reviewerName: Joi.string().trim().min(2).max(50),
})
  .min(1)
  .options({
    stripUnknown: true,
  });

module.exports = {
  createReviewSchema,
  getReviewsSchema,
  reviewIdSchema,
  updateReviewSchema,
};
