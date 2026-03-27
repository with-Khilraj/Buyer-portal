const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// create server
const server = http.createServer(app);

const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const favouriteRoutes = require('./routes/favourite.routes');

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/favourites', favouriteRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});


// connect to database
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