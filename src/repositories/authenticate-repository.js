'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.authenticate = async (data) => {
    return await User.findOne({ email: data.email, password: data.password });
}

exports.getById = async (id) => {
    return await User.findById(id);
}