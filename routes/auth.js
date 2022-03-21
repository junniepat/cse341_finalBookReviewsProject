const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();


router.post('/login', authController.login)
router.post('/signup', authController.signup)
<<<<<<< HEAD


>>>>>>> 7f28c3b43a6639a7c11cad5db5857741d7f8d7ef

module.exports = router;
