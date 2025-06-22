const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    avatar:{
        type:String,
    },
    role:{
        type:String,
        enum:["admin","user","author"],
        default:"user",
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        optional:true

    },
    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        optional:true
    },
    refreshToken:{
        type:String,
    },
},{timestamps:true})

module.exports = mongoose.model('User',userSchema)