const express = require('express');

const reviewsController = require('../controllers/reviews');

const router = express.Router();

router.post('/post',reviewsController.createPost);  
router.put('/post/:reviewId', reviewsController.updatePost);



module.exports = router;
