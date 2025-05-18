const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
        trim: true,
    },
    description: { 
        type: String,
        required: true,
        trim: true,
    },
    image:{
        type: String,
        required: true,
        trim: true,
    },
    isBreaking:{
        type: Boolean,
        default: false,
    },
    isFeatured:{
        type: Boolean,
        default: false,
    },
    npDate:{
        type: Date,
        required: true,
        
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    author:{
        type:Boolean,
        default: true,
        required: true,
    },
    views:{
        type: Number,
        default: 0,
    },
    isDeleted:{
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    },
})

module.exports = mongoose.model("News", newsSchema);