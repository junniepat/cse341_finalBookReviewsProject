// installed express, nodemon, body parser, 
const express = require("express");
const bodyParser = require('body-parser');

const reviewsRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.json());

// prevents CORS error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(reviewsRoutes);
app.use(authRoutes);

// Do you guys want the custom error handler that was used in the lecture?
/*
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message: message})
}); */


// you can change which port if desired
app.listen(8080);