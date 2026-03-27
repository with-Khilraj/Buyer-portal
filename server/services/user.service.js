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
        throw new ApiError(401, 'Incorrect email or password');
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

module.exports = {
    generateTokens,
    createUser,
    loginUserWithEmailAndPassword,
    saveRefreshToken,
};
