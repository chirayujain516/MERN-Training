const ReviewModel = require("../model/reviewModel");
const AppError = require("../utils/AppError");

const ALLOWED_SORT_FIELDS = ["rating", "createdAt"];

const createReview = async (data) => {
  const { title, comment, rating, reviewerName } = data;

  const alreadyReviewed = await ReviewModel.findOne({ reviewerName, title });
  if (alreadyReviewed) {
    throw new AppError("Aap ye review pehle de chuke ho", 409);
  }

  const review = await ReviewModel.create({ title, comment, rating, reviewerName });
  return review;
};

const getReviews = async (queryParams) => {
  const { status, minRating, maxRating, page = 1, limit = 10, sortBy } = queryParams;

  const filter = {};
  if (status) filter.status = status;
  if (minRating || maxRating) {
    filter.rating = {};
    if (minRating) filter.rating.$gte = minRating;
    if (maxRating) filter.rating.$lte = maxRating;
  }

  let sort = { createdAt: -1 };
  if (sortBy) {
    const [field, dir] = sortBy.split(":");
    if (ALLOWED_SORT_FIELDS.includes(field)) {
      sort = { [field]: dir === "asc" ? 1 : -1 };
    }
  }

  const [reviews, total] = await Promise.all([
    ReviewModel.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit),
    ReviewModel.countDocuments(filter),
  ]);

  return {
    reviews,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit) || 1,
  };
};

const getReviewById = async (id) => {
  const review = await ReviewModel.findById(id);
  if (!review) {
    throw new AppError("Review not found", 404);
  }
  return review;
};

const updateReview = async (id, data) => {
  const review = await ReviewModel.findById(id);
  if (!review) {
    throw new AppError("Review not found", 404);
  }

  Object.assign(review, data); 
  await review.save();

  return review;
};

const approveReview = async (id) => {
  const review = await ReviewModel.findById(id);
  if (!review) {
    throw new AppError("Review not found", 404);
  }
  if (review.status === "approved") {
    throw new AppError("Review is already approved", 400);
  }

  review.status = "approved";
  await review.save();

  return review;
};

const deleteReview = async (id) => {
  const review = await ReviewModel.findByIdAndDelete(id);
  if (!review) {
    throw new AppError("Review not found", 404);
  }
  return review;
};

module.exports = {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  approveReview,
  deleteReview,
};
