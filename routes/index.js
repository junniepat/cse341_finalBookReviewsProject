const routes = require('express').Router();
const auth = require('./auth');
const reviews = require('./reviews');

routes.use('/', auth);
routes.use('/', reviews);


module.exports = routes;