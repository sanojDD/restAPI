const express = require("express");
const router = express.Router();

const validate = require("../middleware/validate");
const { productSchema } = require("../validations/productValidation");

const {
  getProducts,
  updateProduct,
  createProduct,
  deleteProduct,
} = require("../controllers/productController");

// GET doesn't usually need a body validation
router.get("/products", getProducts);

// 2. Add the 'validate' middleware before the 'createProduct' controller
router.post("/products", validate(productSchema), createProduct);

// 3. You can also use it for updates (though you might want a partial schema later)
router.put("/products/:id", validate(productSchema), updateProduct);

router.delete("/products/:id", deleteProduct);

module.exports = router;
