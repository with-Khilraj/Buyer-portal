const refreshTokenModel = require('../models/refreshToken.model');
const User = require('../models/user.model');
const { signupSchema, loginSchema } = require('../schema/user.schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// generate access and refresh token
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
}

exports.signup = async (req, res) => {
    try {
        const validate = signupSchema.safeParse(req.body);

        const existingUser = await User.findOne({ email: validate.data.email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(validate.data.password, 10);

        // create new User
        const user = new User({
            email: validate.data.email,
            name: validate.data.name,
            password: hashedPassword,
            role: validate.data.role,
        });

        await user.save();

        const { accessToken, refreshToken } = generateTokens(user);

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            accessToken,
            refreshToken,
        });
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.login = async (req, res) => {
    try {
        const validate = loginSchema.safeParse(req.body);
        const user = await User.findOne({ email: validate.data.email });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // check password
        const isMatch = await bcrypt.compare(validate.data.password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        await user.save();

        // generate tokens
        const { accessToken, refreshToken } = generateTokens(user);

        // save refresh token to db
        const refreshTokenEntry = new refreshTokenModel({
            token: refreshToken,
            userId: user._id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),  // 7 days
        });

        await refreshTokenEntry.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            accessToken,
            refreshToken,
        });
        
    } catch (error) {
        console.log("Error in login", error);
        res.status(500).json({ message: "Internal server error" });
    }
}