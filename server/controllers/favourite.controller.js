const favouriteService = require('../services/favourite.service');
const { favouriteSchema } = require('../schema/product.schema');
const ApiError = require('../utils/ApiError');

const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

exports.addFavourite = catchAsync(async (req, res) => {
    const validate = favouriteSchema.safeParse(req.body);
    if (!validate.success) {
        throw new ApiError(400, 'Invalid input', true, JSON.stringify(validate.error.errors));
    }
    const favourites = await favouriteService.addFavourite(req.user.id, validate.data.productId);
    res.status(200).json({ message: "Product added to favourites", favourites });
});

exports.removeFavourite = catchAsync(async (req, res) => {
    const validate = favouriteSchema.safeParse({ productId: req.params.productId });
    if (!validate.success) {
        throw new ApiError(400, 'Invalid Product ID', true, JSON.stringify(validate.error.errors));
    }
    const favourites = await favouriteService.removeFavourite(req.user.id, validate.data.productId);
    res.status(200).json({ message: "Product removed from favourites", favourites });
});

exports.getFavourites = catchAsync(async (req, res) => {
    const favourites = await favouriteService.getFavourites(req.user.id);
    res.status(200).json(favourites);
});
