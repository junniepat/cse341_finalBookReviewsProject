// installed express, nodemon, body parser, 
const express = require("express");
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const swaggerDocument = require('./swagger.json');
const reviewsRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth');
const reviewModel = require('./models/review');

const app = express();

//stores mongodb connection for later use
const MONGODB_URI =
 // replace with your token;


app.use(bodyParser.json());

// swagger docs
var options = {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }'
  };
  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

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


/* test for database
let first_review = new reviewer({
    userName: 'test',
    title: 'first book',
    author: 'tester test',
    rating: 5,
    reviewSummary: "This is a test",
});

first_review.save().then(result => {
    console.log("logged");
})
.catch(err => {
    console.log(err);
});
*/

// you can change which port if desired
/*
creates the connection to the mongodb database using mongoose

connect to database
        if successful connect
        else log an error
*/

mongoose.connect(MONGODB_URI)
.then(result => {
    app.listen(8080);
})
.catch(err => {
    console.log(err);
})