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
  const { status, page = 1, limit = 10 } = queryParams;

  const filter = {};

  if (status) {
    filter.status = status;
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
    page,
    totalPages,
  };
};

module.exports = {
  createReview,
  getReviews,
};
