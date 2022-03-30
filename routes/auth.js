const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

const {protected} = require('../middleware');
const { body } = require('express-validator');

router.post('/login', authController.login)

router.post('/signup',
[
    body('username').trim()
    .isLength({min: 5})
    ,
    body('password')
      .trim()
      .isLength({ min: 8 }),
    body('email').isEmail()  
  ],
   authController.signup)

   router.put('/updatepassword',
   protected,
    [
    body('updatedPassword')
      .trim()
      .isLength({ min: 8 })
      .withMessage("Invalid password")
      ,
      body('email').isEmail()
  ], authController.updatePassword);

module.exports = router;
