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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/users', userRoute);

module.exports = app;