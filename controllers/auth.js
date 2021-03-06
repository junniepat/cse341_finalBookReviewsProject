const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User = require('../models/user');


exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({message: errors});
  }
  const email = req.body.email;
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashedPw,
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: 'User created!', userId: result._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        process.env.SECRET,
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.updatePassword = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({message: errors});
  }
  let loggedInUserEmail = req.user.email;
  const email = req.body.email;
  const updatedPassword = req.body.updatedPassword;
  bcrypt
    .hash(updatedPassword, 12)
    .then(hashedPw => {

      if (loggedInUserEmail === email) {
      User.findOne({ email: email })
        .then(user => {
        if (!user) {
          const error = new Error('A user with this email could not be found.');
          error.statusCode = 401;
          throw error;
        }
        user.password = hashedPw;
        return user.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Password updated!' });
    }) } else
      {return res.status(404).json({ message: 'Could not update password.'});
        }})

    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}
