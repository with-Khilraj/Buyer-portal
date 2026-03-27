const userController = require('../controllers/userController');
const verifyAccessToken = require('../middlewares/authMiddleware');
const { authLimiter } = require('../middlewares/rateLimiter');
const router = require('express').Router();

router.post('/signup', authLimiter, userController.signup);
router.post('/login', authLimiter, userController.login);
router.get('/me', verifyAccessToken, userController.getMe);

module.exports = router;
