const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const review = require('../models/review');

exports.createReview = (req, res, next) => {

  const userName = req.body.userName;
  const title = req.body.title;
  const content = req.body.content;
  const author = req.body.author;
  const rating = req.body.rating
  const reviewSummary = req.body.reviewSummary
  const review = new Review({
    userName: userName,
    title: title,
    content: content,
    author: author,
    rating: rating,
    reviewSummary: reviewSummary
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
    const error = new Error('data entry was incorrect');
    error.statusCode = 422;
    throw error;
  }
  
  const title = req.body.title;
  const content = req.body.content;
  const author = req.body.author;
  const rating = req.body.rating
  const reviewSummary = req.body.reviewSummary  
  
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
      review.content = content;
      review.author = author;
      review.rating = rating
      review.reviewSummary = reviewSummary  
      
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
