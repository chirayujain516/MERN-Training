const joi = require("joi");

const registerSchema = joi.object({
  name: joi.string().min(2).max(30).required(),
  email: joi.string().min(11).max(30).email().required(),
  password: joi.string().min(8).max(200).required(),
});

const loginSchema = joi.object({
  email: joi.string().min(11).max(30).email().required(),
  password: joi.string().min(8).max(200).required(),
});

const productSchema = joi.object({
  name: joi.string().min(2).max(30).required(),
  SKU: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().min(10).required(),
  category: joi.string().max(200).required(),
});

const updateProductSchema = productSchema.fork(
  ["name", "SKU", "description", "price", "category"],
  (field) => field.optional(),
);

const addressValidationSchema = joi.object({
  type: joi.string().valid("Home", "Office", "Billing", "Shipping"),
  street: joi.string().min(2).max(40).required(),
  city: joi.string().min(2).max(40).required(),
  state: joi.string().min(2).max(40).required(),
  country: joi.string().min(2).max(40).required(),
  pincode: joi.number().required(),
  longitude: joi.number().min(-180).max(180),
  latitude: joi.number().min(-90).max(90),
}).and("longitude", "latitude"); // if one is given, both must be

module.exports = {
  registerSchema,
  loginSchema,
  productSchema,
  updateProductSchema,
  addressValidationSchema,
};
