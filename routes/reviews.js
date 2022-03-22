const express = require('express');
const reviewsController = require('../controllers/reviews');

const router = express.Router();


router.post('/post',reviewsController.createPost);  
router.put('/post/:reviewId', reviewsController.updatePost);
router.get('/reviews', reviewsController.getReviews);
router.get('/review/:id', reviewsController.getReview);
router.delete('/review/:id', reviewsController.deleteReview);



