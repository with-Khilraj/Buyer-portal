const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true,
    },
    name: { 
        type: String, 
        required: true,
        trim: true,
    },
    password: { 
        type: String, 
        required: true,
        select: false,
    },
    role: { 
        type: String, 
        enum: ['buyer', 'seller', 'admin'], 
        default: 'buyer'
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
    },
    favourites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);