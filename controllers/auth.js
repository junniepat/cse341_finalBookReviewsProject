const express = require('express');
const reviewsController = require('../controllers/reviews');
const { body } = require('express-validator');

const router = express.Router();


router.post('/post',
    [
    body('rating')
      .isNumeric()
      .isInt({min: 0, max:5}),
    body('reviewSummary')
      .trim()
      .isLength({ min: 5 })  
  ],
reviewsController.createReview);


router.put('/post/:reviewId',[
    body('rating')
      .isNumeric()
      .isInt({min: 0, max:5}),
    body('reviewSummary')
      .trim()
      .isLength({ min: 5 })  
  ], reviewsController.updateReview);

router.get('/reviews', reviewsController.getReviews);
router.get('/review/:id', reviewsController.getReview);
router.delete('/review/:id', reviewsController.deleteReview);

module.exports = router;
