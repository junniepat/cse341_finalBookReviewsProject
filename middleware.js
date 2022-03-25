const jwt = require('express-jwt');

protected = jwt({secret: process.env.SECRET, algorithms: ['HS256']});

module.exports = {protected};
