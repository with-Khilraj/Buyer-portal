const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    res.locals.errorMessage = message;

    const response = {
        code: statusCode,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    };

    if (process.env.NODE_ENV === 'development') {
        console.error(err);
    }

    res.status(statusCode).send(response);
};

module.exports = {
    errorHandler,
};
