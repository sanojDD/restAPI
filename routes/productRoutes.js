const express = require("express");
const router = express.Router();

const validate = require("../middleware/validate");
const { productSchema } = require("../validations/productValidation");
const { protect, admin } = require("../middleware/authMiddleware");

const {
  getProducts,
  updateProduct,
  createProduct,
  deleteProduct,
} = require("../controllers/productController");

// GET doesn't usually need a body validation
router.get("/products", getProducts);

// 2. Add the 'validate' middleware before the 'createProduct' controller
router.post(
  "/products",
  protect,
  admin,
  validate(productSchema),
  createProduct,
);

// 3. You can also use it for updates (though you might want a partial schema later)
router.put(
  "/products/:id",
  protect,
  admin,
  validate(productSchema),
  updateProduct,
);

router.delete("/products/:id", protect, admin, deleteProduct);

module.exports = router;
