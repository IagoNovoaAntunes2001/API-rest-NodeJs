'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.create = async (data) => {
    var user = new User(data);
    await user.save();
}

exports.authenticate = async (data) => {
    return await User.findOne({ email: data.email, password: data.password });
}