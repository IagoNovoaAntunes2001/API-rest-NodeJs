'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/authenticate-controller');

router.post('/', controller.authenticate);
router.post('/refreshToken', controller.refreshToken);

module.exports = router;