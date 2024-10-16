const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'instructor'],
        required: true,
    },
    lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'lecture' }]
}, { timestamps: true }
);

module.exports = mongoose.model('user', userSchema)