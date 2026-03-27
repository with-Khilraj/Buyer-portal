const Product = require('../models/product.model');
const ApiError = require('../utils/ApiError');

const getAllProducts = async () => {
    return await Product.find();
};

const getProductById = async (id) => {
    const product = await Product.findById(id);
    if (!product) {
        throw new ApiError(404, 'Product not found');
    }
    return product;
};

const createProduct = async (productData) => {
    const product = new Product(productData);
    await product.save();
    return product;
};

const seedProducts = async () => {
    const products = [
        { name: "Luxury Apartment", description: "A beautiful apartment in the city center.", price: 250000, location: "New York", category: "Apartment" },
        { name: "Cozy House", description: "Perfect for a small family.", price: 150000, location: "Texas", category: "House" },
        { name: "Beach Villa", description: "Stunning view of the ocean.", price: 500000, location: "California", category: "Villa" },
    ];
    await Product.insertMany(products);
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    seedProducts,
};
