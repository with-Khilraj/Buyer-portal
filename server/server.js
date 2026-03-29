const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { apiLimiter } = require('./middlewares/rateLimiter');
const { errorHandler } = require('./middlewares/errorMiddleware');

const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const favouriteRoutes = require('./routes/favourite.routes');

require("dotenv").config();
const app = express();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Apply global rate limiter to all api routes
app.use('/api/', apiLimiter);

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/favourites', favouriteRoutes);

// Centralized error handling
app.use(errorHandler);

// Connect to database and start server
mongoose.connect(process.env.MONGO_URL, { maxPoolSize: 10, minPoolSize: 5 })
    .then(() => {
        console.log("MongoDB connected successfully");
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Error connecting to database", err);
    });