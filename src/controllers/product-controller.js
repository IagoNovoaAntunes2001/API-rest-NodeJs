'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Validator = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    }catch(e) {
        res.status(500).send({message: 'Failed to process your request'});
    }
};

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    }catch(e){
        res.status(400).send({ message: 'Failed to find the product', data: e });
    }
};

exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    }catch(e){
        res.status(500).send({ message: 'Failed to find the product', error: e });
    }
};

exports.post = async (req, res, next) => {
    let contract = new Validator();
    contract.hasMinLen(req.body.title, 3, 'The title must has 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'The slug must has 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'The description must has 3 caracteres');

    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try{
        await repository.create(req.body);
        res.status(201).send({ message: 'Product has saved with success!' });
    }catch(e){
        res.status(500).send({ message: 'Product has failed to save', data: e });
    }
};

exports.put = async (req, res, next) => {
    try{
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message:'Product has update with success!' });
    }catch(e){
        res.status(400).send({ message: 'Failed to update the product', data: e });
    }
};

exports.delete = async (req, res, next) => {
    try{
        await repository.delete(req.body.id);
        res.status(200).send({ message:'Product has delete with success!' });
    }catch(e){
        res.status(400).send({ message: 'Failed to delete the product', data: e });
    }
};