const Validator = require('../validators/fluent-validator');
const repository = require('../repositories/authenticate-repository');
const authService = require('../services/auth-services');
const verifyToken = require('../utils/verify-token');
const md5 = require('md5');

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

        let token = await verifyToken(user);

        res.status(201).send({
            token: token,
            data: {
                email: user.email,
                name: user.name,
                roles: user.roles
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Fail to process your request'
        });
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        
        const user = await repository.getById(data.id);

        if (!user) {
            res.status(404).send({ message: 'Client not found' });
            return;
        }

        const tokenData = await authService.generateToken({
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.roles
        });

        res.status(201).send({
            token: tokenData,
            data: {
                email: user.email,
                name: user.name,
                roles: user.roles
            }
        });
    } catch (error) {
        res.status(500).send({
            message: 'Fail to process your request'
        });
    }
};