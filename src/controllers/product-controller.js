'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = (req, res, next) => {
    Product.find({ active: true }, '_id title price slug description price').then(o => {
        res.status(200).send(o);
    }).catch(e => {
        res.status(400).send({ message: 'Failed to find the product', data: e });
    });;
};

exports.getById = (req, res, next) => {
    Product.findById(req.params.id).then(o => {
        res.status(200).send(o);
    }).catch(e => {
        res.status(400).send({ message: 'Failed to find the product', data: e });
    });;
};

exports.getBySlug = (req, res, next) => {
    Product.findOne({slug: req.params.slug, active: true}, '_id title price slug description price').then(o => {
        res.status(200).send(o);
    }).catch(e => {
        res.status(400).send({ message: 'Failed to find the product', data: e });
    });;
};

exports.post = (req, res, next) => {
    var product = new Product(req.body);
    product.save().then(o => {
        res.status(201).send({ message: 'Product has saved with success!' });
    }).catch(e => {
        res.status(400).send({ message: 'Product has failed to save', data: e });
    });
};

exports.put = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price
        }
    }).then(o => {
        res.status(200).send({ message:'Product has update with success!' });
    }).catch(e => {
        res.status(400).send({ message: 'Failed to update the product', data: e });
    });
};

exports.delete = (req, res, next) => {
    Product.findByIdAndDelete(req.body.id).then(o => {
        res.status(200).send({ message:'Product has delete with success!' });
    }).catch(e => {
        res.status(400).send({ message: 'Failed to delete the product', data: e });
    });
};