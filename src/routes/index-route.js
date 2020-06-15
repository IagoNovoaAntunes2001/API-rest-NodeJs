'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'Node API rest + MongoDB(Mlab). API do workshop',
        version: '1.0',
        description: 'Essa API foi elaborada no padrão MVC, feita para ser utilizada na palestra de flutter.'
    });
});

module.exports = router;