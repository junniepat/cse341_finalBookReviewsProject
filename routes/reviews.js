const express = require('express');
const reviewsController = require('../controllers/reviews');
const {protected} = require('../middleware');
const router = express.Router();

router.post('/post', protected, reviewsController.createReview);
router.put('/post/:reviewId', protected, reviewsController.updateReview);
router.get('/reviews', reviewsController.getReviews);
router.get('/review/:id', reviewsController.getReview);
router.delete('/review/:id', protected, reviewsController.deleteReview);

module.exports = router;
