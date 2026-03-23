const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is mandatory"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: {
        values: ["Electronics", "Fashion", "Home", "Beauty", "Sports"],
        message: "{VALUE} is not a valid category",
      },
    },
    brand: {
      type: String,
      required: [true, "Please provide the brand name"],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String }, // Useful if using Cloudinary/AWS
      },
    ],
    ratings: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds updatedAt and createdAt fields
  },
);

const ProductModel = model("Product", ProductSchema);

module.exports = ProductModel;
