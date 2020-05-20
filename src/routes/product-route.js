'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const authservice = require('../services/auth-services');

router.get('/', authservice.authorize, controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.post('/', authservice.authorize, controller.post);
router.post('/authenticate', authservice. authorize,controller.authenticate);
router.put('/:id', authservice.authorize, controller.put);
router.delete('/', authservice.authorize, controller.delete);

module.exports = router;