const userService = require('../services/user.service');
const { signupSchema, loginSchema, updateProfileSchema, updatePasswordSchema } = require('../schema/user.schema');
const ApiError = require('../utils/ApiError');

const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};


exports.signup = catchAsync(async (req, res) => {
    const validate = signupSchema.safeParse(req.body);
    if (!validate.success) {
        const errorMsg = validate.error.errors[0]?.message || 'Invalid input';
        throw new ApiError(400, errorMsg);
    }

    const user = await userService.createUser(validate.data);
    const { accessToken, refreshToken } = userService.generateTokens(user);

    await userService.saveRefreshToken(refreshToken, user._id);

    // Set cookie after successful authentication
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000  // 15 minutes for access token
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
    });

    res.status(201).json({
        message: "User created successfully",
        user: { id: user._id, email: user.email, name: user.name, role: user.role, gender: user.gender }
    });
});

exports.login = catchAsync(async (req, res) => {
    const validate = loginSchema.safeParse(req.body);
    if (!validate.success) {
        const errorMsg = validate.error.errors[0]?.message || 'Invalid input';
        throw new ApiError(400, errorMsg);
    }

    const user = await userService.loginUserWithEmailAndPassword(validate.data.email, validate.data.password);
    const { accessToken, refreshToken } = userService.generateTokens(user);

    await userService.saveRefreshToken(refreshToken, user._id);

    // Set cookie after successful authentication
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000  // 15 minutes for access token
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
    });

    res.status(200).json({
        message: "Login successful",
        user: { id: user._id, email: user.email, name: user.name, role: user.role, gender: user.gender }
    });
});

exports.getMe = catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.user.id);
    if (!user) throw new ApiError(404, 'User not found');
    res.status(200).json({
        user: { id: user._id, email: user.email, name: user.name, role: user.role, gender: user.gender }
    });
});

exports.logout = catchAsync(async (req, res) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000  // 15 minutes for access token
    });

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
    });
    res.status(200).json({ message: 'Logged out successfully' });
});

exports.updateProfile = catchAsync(async (req, res) => {
    const validate = updateProfileSchema.safeParse(req.body);
    if (!validate.success) {
        const errorMsg = validate.error.errors[0]?.message || 'Invalid input';
        throw new ApiError(400, errorMsg);
    }

    const user = await userService.updateUser(req.user.id, validate.data);
    res.status(200).json({
        message: "Profile updated successfully",
        user: { id: user._id, email: user.email, name: user.name, role: user.role, gender: user.gender }
    });
});

exports.updatePassword = catchAsync(async (req, res) => {
    const validate = updatePasswordSchema.safeParse(req.body);
    if (!validate.success) {
        const errorMsg = validate.error.errors[0]?.message || 'Invalid input';
        throw new ApiError(400, errorMsg);
    }

    await userService.updatePassword(req.user.id, validate.data.currentPassword, validate.data.newPassword);
    res.status(200).json({ message: "Password updated successfully" });
});