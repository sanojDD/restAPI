const { z } = require("zod");

const productSchema = z.object({
  name: z
    .string({ required_error: "Product name is required" })
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name cannot exceed 100 characters"),

  description: z
    .string({ required_error: "Description is required" })
    .max(1000, "Description cannot exceed 1000 characters"),

  price: z
    .number({ required_error: "Price is mandatory" })
    .min(0, "Price cannot be negative"),

  category: z.enum(["Electronics", "Fashion", "Home", "Beauty", "Sports"], {
    error_map: () => ({ message: "Please select a valid category" }),
  }),

  brand: z.string().min(1, "Brand name is required"),

  stock: z.number().int().min(0).default(0),

  images: z
    .array(
      z.object({
        url: z.string().url("Invalid image URL"),
        public_id: z.string().optional(),
      }),
    )
    .optional(),

  isFeatured: z.boolean().default(false).optional(),
});

module.exports = { productSchema };
