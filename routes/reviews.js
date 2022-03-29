const express = require('express');
const reviewsController = require('../controllers/reviews');

const router = express.Router();


router.post('/post',function(req, res){reviewsController.createReview});  
router.put('/post/:reviewId', function(req, res){reviewsController.updateReview});
router.get('/reviews', reviewsController.getReviews);
router.get('/review/:id', reviewsController.getReview);
router.delete('/review/:id', reviewsController.deleteReview);

module.exports = router;
