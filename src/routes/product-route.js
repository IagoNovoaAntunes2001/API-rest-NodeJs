'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const authservice = require('../services/auth-services');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.post('/', controller.post);
router.post('/authenticate', controller.authenticate);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;