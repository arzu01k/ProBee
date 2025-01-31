const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Instructor', 'Student'],
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);