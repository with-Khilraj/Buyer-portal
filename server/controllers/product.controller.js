const Product = require('../models/product.model');
const { favouriteSchema } = require('../schema/product.schema');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const validate = favouriteSchema.safeParse({ productId: req.params.id });
        if (!validate.success) {
            return res.status(400).json({ message: "Invalid Product ID", errors: validate.error.errors });
        }
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }
};

// Seed initial data if needed (for user to have something to look at)
exports.seedProducts = async (req, res) => {
    try {
        const products = [
            { name: "Luxury Apartment", description: "A beautiful apartment in the city center.", price: 250000, location: "New York", category: "Apartment" },
            { name: "Cozy House", description: "Perfect for a small family.", price: 150000, location: "Texas", category: "House" },
            { name: "Beach Villa", description: "Stunning view of the ocean.", price: 500000, location: "California", category: "Villa" },
        ];
        await Product.insertMany(products);
        res.status(201).json({ message: "Products seeded successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error seeding products", error: error.message });
    }
};
