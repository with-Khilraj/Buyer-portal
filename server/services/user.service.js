const User = require('../models/user.model');
const refreshTokenModel = require('../models/refreshToken.model');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
};

const createUser = async (userData) => {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new ApiError(400, 'User already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({
        ...userData,
        password: hashedPassword,
    });

    await user.save();
    return user;
};

const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new ApiError(400, 'Incorrect email or password');
    }
    return user;
};

const saveRefreshToken = async (token, userId) => {
    const refreshTokenEntry = new refreshTokenModel({
        token,
        userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    await refreshTokenEntry.save();
};

const updateUser = async (userId, updateData) => {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!user) {
        throw new ApiError(404, 'User not found');
    }
    return user;
};

const updatePassword = async (userId, currentPassword, newPassword) => {
    const user = await User.findById(userId).select('+password');
    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
        throw new ApiError(400, 'Current password is incorrect');
    }

    if (await bcrypt.compare(newPassword, user.password)) {
        throw new ApiError(400, 'New password cannot be the same as current password');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return user;
};

const getUserById = async (userId) => {
    return await User.findById(userId);
};

module.exports = {
    generateTokens,
    createUser,
    loginUserWithEmailAndPassword,
    saveRefreshToken,
    updateUser,
    updatePassword,
    getUserById,
};
