const express = require('express');

const reviewsController = require('../controllers/reviews');

const router = express.Router();

// reviews
console.log(reviewsController.getReviews)
router.get('/reviews', reviewsController.getReviews);
//router.post('/reviews', reviewsController.createReview);
router.get('/review/:id', reviewsController.getReview);
router.delete('/review/:id', reviewsController.deleteReview);

module.exports = router;
