'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async () => {
    return await Product.find({ active: true }, '_id title price active slug description image_url');
}

exports.getBySlug = async (slug) => {
    return await Product.findOne({slug: slug, active: true}, '_id title price slug description image_url');
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
            price: data.price,
            image_url: data.image_url
        }
    })
}

exports.delete = async (id) => {
    await Product.findByIdAndDelete(id);
}