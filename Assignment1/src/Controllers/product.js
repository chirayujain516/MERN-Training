// product.js
const {
  createProductService,
  getAllProductService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
} = require("../Services/productService");

const createProduct = async (req, res) => {
  const { name, SKU, description, price, category } = req.body;
  try {
    const product = await createProductService({
      name,
      SKU,
      description,
      price,
      category,
    });
    return res
      .status(201)
      .json({ message: "Product successfully created", product });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Cannot create product" });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const allProduct = await getAllProductService();
    return res.status(200).json({ allProduct });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Cannot get products" });
  }
};

const getProductById = async (req, res) => {
  let id = req.params.id;
  try {
    const product = await getProductByIdService(id);
    return res.status(200).json({ product });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Cannot get product" });
  }
};

const updateProduct = async (req, res) => {
  let id = req.params.id;
  try {
    const product = await updateProductService(id, req.body);
    return res.status(200).json({ message: "After update", product });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Cannot update" });
  }
};

const deleteProduct = async (req, res) => {
  let id = req.params.id;
  try {
    let product = await deleteProductService(id);
    return res.status(200).json({ message: "Deleted successfully", product });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Cannot delete" });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
