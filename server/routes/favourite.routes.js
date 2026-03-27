const router = require('express').Router();
const favouriteController = require('../controllers/favourite.controller');
const verifyAccessToken = require('../middlewares/authMiddleware');

router.use(verifyAccessToken); // All favourite routes require auth

router.get('/', favouriteController.getFavourites);
router.post('/', favouriteController.addFavourite);
router.delete('/:productId', favouriteController.removeFavourite);

module.exports = router;
