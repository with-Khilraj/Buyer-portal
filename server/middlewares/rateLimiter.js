const rateLimit = require('express-rate-limit');

const isDev = process.env.NODE_ENV === 'development';

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: isDev ? 10000 : 500, // Effectively disabled in dev
    standardHeaders: true,
    legacyHeaders: false,
    skip: () => isDev, // Double insurance for dev
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: isDev ? 1000 : 100,
    message: 'Too many auth attempts from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
    skip: () => isDev,
});

module.exports = {
    apiLimiter,
    authLimiter,
};
