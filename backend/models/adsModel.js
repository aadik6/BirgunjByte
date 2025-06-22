const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    dailyViews: [{
        date: {
            type: Date,
            default: Date.now,
        },
        views: {
            type: Number,
            default: 0,
        },
    }],
    clicks: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    expireAt: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Ad', adSchema);