const routes = require('express').Router();
const auth = require('./auth');
const reviews = require('./reviews');

routes.use('/auth/login', auth);
routes.use('/reviews', reviews);

module.exports = routes;