const ReviewModel = require("../model/reviewModel");

const createReview = async (data) => {
  const { title, reviewerName } = data;

  const alreadyReviewed = await ReviewModel.findOne({
    reviewerName,
    title,
  });

  if (alreadyReviewed) {
    throw new Error("aap ye review pehle de chuke ho");
  }

  const review = await ReviewModel.create(data);

  return review;
};

const getReviews = async (queryParams) => {
  const { status, minRating, page = 1, limit = 10 } = queryParams;

  const filter = {};

  if (status) {
    filter.status = status;
  }

  if (minRating) {
    filter.rating = { $gte: Number(minRating) };
  }

  const skip = (page - 1) * limit;

  const [reviews, total] = await Promise.all([
    ReviewModel.find(filter).skip(skip).limit(limit),

    ReviewModel.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    reviews,
    total,
    page: Number(page),
    totalPages,
  };
};

const getSingleReview = async (id) => {
  const review = await ReviewModel.findById(id);
  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }
  return review;
};

const updateReview = async (id, updateData) => {
  const review = await ReviewModel.findById(id);
  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }
  
  Object.keys(updateData).forEach((key) => {
    review[key] = updateData[key];
  });
  
  await review.save();
  return review;
};

const deleteReview = async (id) => {
  const review = await ReviewModel.findByIdAndDelete(id);
  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }
  return review;
};

const approveReview = async (id) => {
  const review = await ReviewModel.findById(id);
  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }

  if (review.status === "approved") {
    const error = new Error("Review is already approved");
    error.statusCode = 400;
    throw error;
  }

  review.status = "approved";
  await review.save();
  return review;
};

module.exports = {
  createReview,
  getReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  approveReview,
};
