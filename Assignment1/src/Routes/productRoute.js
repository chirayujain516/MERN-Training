const express = require("express");
const router = express.Router();
const validation = require("../Middlewares/checkValidation");
const checkToken = require("../Middlewares/checkToken");
const {
  productSchema,
  updateProductSchema,
} = require("../Middlewares/validationSchema");

const {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../Controllers/product");
const authorization = require("../Middlewares/authorization");

router.post(
  "/createproduct",
  validation(productSchema),
  checkToken,
  createProduct,
);

router.get("/getallproduct", getAllProduct);
router.get("/getproductbyid/:id", getProductById);
router.patch(
  "/updateproductbyid/:id",
  checkToken,
  validation(updateProductSchema),
  authorization("admin", "seller"),
  updateProduct,
);
router.delete(
  "/deleteproduct/:id",
  checkToken,
  authorization("admin", "seller"),
  deleteProduct,
);

module.exports = router;
