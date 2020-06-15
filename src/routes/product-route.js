'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const authservice = require('../services/auth-services');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.post('/',  authservice.isAdmin, controller.post);
router.put('/:id', authservice.isAdmin, controller.put);
router.delete('/', authservice.isAdmin, controller.delete);

module.exports = router;