'use strict';

const Validator = require('../validators/fluent-validator');
const repository = require('../repositories/user-repository');
const authService = require('../services/auth-services');
const md5 = require('md5');

exports.post = async (req, res, next) => {
    let contract = new Validator();
    contract.hasMinLen(req.body.name, 2, 'The name must has 3 caracteres');
    contract.isEmail(req.body.email, 4, 'E-mail is not valid');
    contract.hasMinLen(req.body.password, 6, 'The password must has 6 caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });
        res.status(201).send({ message: 'Client has saved with success!' });
    } catch (error) {
        res.status(500).send({
            message: 'Fail to process your request'
        });
    }
};

exports.authenticate = async (req, res, next) => {
    let contract = new Validator();
    contract.isEmail(req.body.email, 4, 'E-mail is not valid');
    contract.hasMinLen(req.body.password, 6, 'The password must has 6 caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        const user = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!user) {
            res.status(404).send({ message: 'User or password is not valid' });
            return;
        }

        const token = await authService.generateToken({
            email: user.email,
            name: user.name
        });

        res.status(201).send({
            token: token,
            data: {
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        res.status(500).send({
            message: 'Fail to process your request'
        });
    }
};