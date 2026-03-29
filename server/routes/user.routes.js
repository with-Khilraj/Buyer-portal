const userController = require('../controllers/user.controller');
const verifyAccessToken = require('../middlewares/authMiddleware');
const { authLimiter } = require('../middlewares/rateLimiter');
const router = require('express').Router();

const validate = require("../middlewares/validate");
const { signupSchema, loginSchema } = require('../schema/user.schema')

router.post('/signup', authLimiter, validate(signupSchema), userController.signup);
router.post('/login', authLimiter, validate(loginSchema), userController.login);
router.get('/me', verifyAccessToken, userController.getMe);
router.post('/logout', userController.logout);
router.patch('/profile', verifyAccessToken, userController.updateProfile);
router.patch('/password', verifyAccessToken, userController.updatePassword);

module.exports = router;
