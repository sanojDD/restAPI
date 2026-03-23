const Product = require("../models/productModel");
const asyncHandler = require("../middleware/asyncHandler");
// businesslogic

const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).populate("user", "name email");

    if (!products && products.length == 0) {
      res.json({
        message: "no products",
      });
    }

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Could not fetch products",
      error: error.message,
    });
  }
});

const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, description, category, brand, stock, images } =
      req.body;

    // 1. Basic Validation (Safety Check)
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, price, and category.",
      });
    }

    // 2. Check for existing product (Optional: prevents duplicates)
    const productExists = await Product.findOne({ name });
    if (productExists) {
      return res.status(400).json({
        success: false,
        message: "Product with this name already exists",
      });
    }

    // 3. Create the product
    const product = await Product.create({
      user: req.user._id,
      name,
      description,
      price,
      category,
      brand,
      stock,
      images,
    });

    // 4. Send Success Response
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    // 5. Handle Mongoose Validation Errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error: Could not create product",
      error: error.message,
    });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find product and update
    // new: true -> returns the modified document rather than the original
    // runValidators: true -> ensures the update follows your Schema rules
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    // 2. Check if product existed
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 3. Success response
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    // 4. Handle invalid ObjectId format
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Product ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error: Could not update product",
      error: error.message,
    });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Attempt to find and delete the product
    const product = await Product.findByIdAndDelete(id);

    // 2. If no product was found with that ID
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found. It may have already been deleted.",
      });
    }

    // 3. Success response
    res.status(200).json({
      success: true,
      message: `Product '${product.name}' has been deleted successfully.`,
    });
  } catch (error) {
    // 4. Handle invalid MongoDB ID format (CastError)
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message:
          "Invalid ID format. Please provide a valid 24-character hex ID.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error: Could not delete product",
      error: error.message,
    });
  }
});

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
