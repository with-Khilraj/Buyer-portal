const userService = require('../services/user.service');
const { signupSchema, loginSchema } = require('../schema/user.schema');
const ApiError = require('../utils/ApiError');

const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

exports.signup = catchAsync(async (req, res) => {
    const validate = signupSchema.safeParse(req.body);
    if (!validate.success) {
        throw new ApiError(400, 'Invalid input', true, JSON.stringify(validate.error.errors));
    }

    const user = await userService.createUser(validate.data);
    const { accessToken, refreshToken } = userService.generateTokens(user);

    res.status(201).json({
        message: "User created successfully",
        user: { id: user._id, email: user.email, name: user.name, role: user.role },
        accessToken,
        refreshToken,
    });
});

exports.login = catchAsync(async (req, res) => {
    const validate = loginSchema.safeParse(req.body);
    if (!validate.success) {
        throw new ApiError(400, 'Invalid input', true, JSON.stringify(validate.error.errors));
    }

    const user = await userService.loginUserWithEmailAndPassword(validate.data.email, validate.data.password);
    const { accessToken, refreshToken } = userService.generateTokens(user);

    await userService.saveRefreshToken(refreshToken, user._id);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
        message: "Login successful",
        user: { id: user._id, email: user.email, name: user.name, role: user.role },
        accessToken,
        refreshToken,
    });
});

exports.getMe = catchAsync(async (req, res) => {
    res.status(200).json({
        user: req.user
    });
});