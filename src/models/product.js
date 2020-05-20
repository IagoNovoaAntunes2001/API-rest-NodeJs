'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: [true, 'The title is required'],
        trim: true
    },
    slug: {
        type: String,
        required: [true, 'The slug is required'],
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'The description is required'],
    },
    price: {
        type: Number,
        required: [true, 'The price is required'],
    },
    active: {
        type: Boolean,
        required: [true, 'The active is required'],
        default: true
    },
    image_base64: {
        type: String,
        trim: true
    },
    image_url: {
        type: String,
        required: [true, 'The url of image is required'],
        trim: true
    }
});

module.exports = mongoose.model('Product', schema);