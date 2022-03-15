const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const review = require('../models/review');

exports.createReview = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.body.imageUrl;
  const title = req.body.title;
  const content = req.body.content;
  const review = new Review({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: { name: "temp" }
  });
  review
    .save()
    .then(result => {
      res.status(201).json({
        message: 'review created successfully!',
        review: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.updateReview = (req, res, next) => {
  const reviewId = req.params.reviewId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error('No file picked.');
    error.statusCode = 422;
    throw error;
  }
  review.findById(reviewId)
    .then(review => {
      if (!review) {
        const error = new Error('Could not find review.');
        error.statusCode = 404;
        throw error;
      }
      if (imageUrl !== review.imageUrl) {
        clearImage(review.imageUrl);
      }
      review.title = title;
      review.imageUrl = imageUrl;
      review.content = content;
      return review.save();
    })
    .then(result => {
      res.status(200).json({ message: 'review updated!', review: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deletereview = (req, res, next) => {
  const reviewId = req.params.reviewId;
  review.findById(reviewId)
    .then(review => {
      if (!review) {
        const error = new Error('Could not find review.');
        error.statusCode = 404;
        throw error;
      }
      // Check logged in user
      clearImage(review.imageUrl);
      return review.findByIdAndRemove(reviewId);
    })
    .then(result => {
      console.log(result);
      res.status(200).json({ message: 'Deleted review.' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
