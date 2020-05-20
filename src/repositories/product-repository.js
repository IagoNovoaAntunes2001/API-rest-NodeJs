'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.authenticate = async (data) => {
    return await Product.findOne({ title: data.title, active: data.active }, '_id title price slug description price');
}

exports.get = async () => {
    return await Product.find({ active: true }, '_id title price slug description price');
}

exports.getBySlug = async (slug) => {
    return await Product.findOne({slug: slug, active: true}, '_id title price slug description price');
}

exports.getById = async (id) => {
    return await Product.findById(id);
}

exports.create = async (data) => {
    var product = new Product(data);
    await product.save();
}

exports.update = async (id, data) => {
    await Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            slug: data.slug,
            description: data.description,
            price: data.price
        }
    })
}

exports.delete = async (id) => {
    await Product.findByIdAndDelete(id);
}