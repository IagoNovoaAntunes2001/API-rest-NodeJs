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
    }
});

module.exports = mongoose.model('Product', schema);