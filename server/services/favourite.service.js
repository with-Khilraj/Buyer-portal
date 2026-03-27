const User = require('../models/user.model');
const Product = require('../models/product.model');
const ApiError = require('../utils/ApiError');

const addFavourite = async (userId, productId) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, 'Product not found');
    }

    const user = await User.findById(userId);
    if (user.favourites.includes(productId)) {
        throw new ApiError(400, 'Product already in favourites');
    }

    user.favourites.push(productId);
    await user.save();
    return user.favourites;
};

const removeFavourite = async (userId, productId) => {
    const user = await User.findById(userId);
    user.favourites = user.favourites.filter(id => id.toString() !== productId);
    await user.save();
    return user.favourites;
};

const getFavourites = async (userId) => {
    const user = await User.findById(userId).populate('favourites');
    return user.favourites;
};

module.exports = {
    addFavourite,
    removeFavourite,
    getFavourites,
};
