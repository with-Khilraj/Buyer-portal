const User = require('../models/user.model');
const Product = require('../models/product.model');
const { favouriteSchema } = require('../schema/product.schema');

exports.addFavourite = async (req, res) => {
    try {
        const validate = favouriteSchema.safeParse(req.body);
        if (!validate.success) {
            return res.status(400).json({ message: "Invalid input", errors: validate.error.errors });
        }
        const { productId } = validate.data;
        const userId = req.user.id;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const user = await User.findById(userId);
        if (user.favourites.includes(productId)) {
            return res.status(400).json({ message: "Product already in favourites" });
        }

        user.favourites.push(productId);
        await user.save();

        res.status(200).json({ message: "Product added to favourites", favourites: user.favourites });
    } catch (error) {
        res.status(500).json({ message: "Error adding to favourites", error: error.message });
    }
};

exports.removeFavourite = async (req, res) => {
    try {
        const validate = favouriteSchema.safeParse({ productId: req.params.productId });
        if (!validate.success) {
            return res.status(400).json({ message: "Invalid Product ID", errors: validate.error.errors });
        }
        const { productId } = validate.data;
        const userId = req.user.id;

        const user = await User.findById(userId);
        user.favourites = user.favourites.filter(id => id.toString() !== productId);
        await user.save();

        res.status(200).json({ message: "Product removed from favourites", favourites: user.favourites });
    } catch (error) {
        res.status(500).json({ message: "Error removing from favourites", error: error.message });
    }
};

exports.getFavourites = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('favourites');
        res.status(200).json(user.favourites);
    } catch (error) {
        res.status(500).json({ message: "Error fetching favourites", error: error.message });
    }
};
