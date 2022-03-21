const express = require('express');

const reviewsController = require('../controllers/reviews');

const router = express.Router();

router.post('/post',reviewsController.createPost);  
router.put('/post/:reviewId', reviewsController.updatePost);
<<<<<<< HEAD


=======
>>>>>>> 7f28c3b43a6639a7c11cad5db5857741d7f8d7ef



module.exports = router;
