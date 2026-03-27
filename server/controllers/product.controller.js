const productService = require('../services/product.service');
const { favouriteSchema } = require('../schema/product.schema');
const ApiError = require('../utils/ApiError');

const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

exports.getAllProducts = catchAsync(async (req, res) => {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
});

exports.getProductById = catchAsync(async (req, res) => {
    const validate = favouriteSchema.safeParse({ productId: req.params.id });
    if (!validate.success) {
        throw new ApiError(400, 'Invalid Product ID', true, JSON.stringify(validate.error.errors));
    }
    const product = await productService.getProductById(req.params.id);
    res.status(200).json(product);
});

exports.seedProducts = catchAsync(async (req, res) => {
    await productService.seedProducts();
    res.status(201).json({ message: "Products seeded successfully" });
});
