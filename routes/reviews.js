const express = require('express');

const reviewsController = require('../controllers/reviews');

const router = express.Router();

router.post(
    '/post',
    isAuth,
    [
      body('title')
        .trim()
        .isLength({ min: 5 }),
      body('content')
        .trim()
        .isLength({ min: 5 })
    ],
    reviewsController.createPost
  );
  
  router.put(
    '/post/:reviewId',
    isAuth,
    [
      body('title')
        .trim()
        .isLength({ min: 5 }),
      body('content')
        .trim()
        .isLength({ min: 5 })
    ],
    reviewsController.updatePost
  );
  
  router.delete('/post/:reviewId', reviewsController.deletePost);

module.exports = router;