const { z } = require("zod");

const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().positive("Price must be positive"),
    location: z.string().min(1, "Location is required"),
    category: z.enum(['Apartment', 'House', 'Villa', 'Land']).optional(),
});

const favouriteSchema = z.object({
    productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID"),
});

module.exports = { productSchema, favouriteSchema };
