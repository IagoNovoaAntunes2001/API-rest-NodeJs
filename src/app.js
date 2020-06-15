'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

// Connection to database
mongoose.connect(config.connectionStringToHeroku, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
mongoose.set('useFindAndModify', false);

// Models
const Product = require('./models/product');
const User = require('./models/user');

// Routes
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const userRoute = require('./routes/user-route');
const authenticateRoute = require('./routes/authenticate-route');

app.use(bodyParser.json({
    limit: '5mb'
}));

app.use(bodyParser.urlencoded({ extended: false }));

// Habilita o CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/users', userRoute);
app.use('/authenticate', authenticateRoute);

module.exports = app;