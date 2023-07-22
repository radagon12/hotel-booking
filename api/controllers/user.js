const userSchema = require('../models/user');
const mongoose = require('mongoose');
const createError = require('../utils/error');

const User = mongoose.model('User', userSchema);

exports.updateUser = async (req,res,next) =>{
    try{
        const updatedUser = await User.updateOne({"_id" : req.params.id}, {$set: req.body}, {new: true});

        res.status(200).json(updatedUser);
    }catch(e)
    {
        res.status(500).json({status: 'error', message: e});
    }
}

exports.deleteUser = async (req,res,next) =>{
    try{
        await User.deleteOne({"_id" : req.params.id});

        res.status(200).json({
            status: 'success',
            message: "user deleted successfully"
        });
    }catch(e)
    {
        return next(createError(400, e));
    }
}

exports.getUser = async (req,res,next) =>{
    try{
        const user = await User.findOne({"_id" : req.params.id});

        res.status(200).json(user);
    }catch(e)
    {
        return next(createError(400, e));
    }
}

exports.getAllUsers = async (req,res,next) =>{
    try{
        const users = await User.find();

        res.status(200).json(users);
    }catch(e)
    {
        res.status(500).json({status: 'error', message: e});
    }
}