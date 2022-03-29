
const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

const Review = require('../models/review');

async function createReview(req, res, next){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({message: 'input is not valid'});
  }
  const username = req.body.username;
  const title = req.body.title;
  const author = req.body.author;
  const rating = req.body.rating
  const reviewSummary = req.body.reviewSummary
  const review = new Review({
    username: username,
    title: title,
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


async function updateReview(req, res, next){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({message: 'input is not valid'});
  }
  const reviewId = req.params.reviewId;
  const title = req.body.title;
  const author = req.body.author;
  const rating = req.body.rating
  const reviewSummary = req.body.reviewSummary


  const review = await Review.findById(reviewId);
    
      if (!review) {
        return res.status(404).json({message: 'could not find review.'});

      }else{
      review.title = title;
      review.author = author;
      review.rating = rating;
      review.reviewSummary = reviewSummary;
      
      review.save();
      }
      return res.status(200).json({message: 'review updated.', reviews: review});

    };

//Get all reviews
async function getReviews(req, res, next) {
  try {
    reviews = await Review.find();
    return res.status(200).json({message: 'Fetched reviews successfully.', reviews: reviews});
  } catch (error) {
    return res.status(500).json({message: 'Failed to fetch reviews.'});
  }
};

//Get a single review
async function getReview(req, res, next) {
  const reviewId = req.params.id;
  const review = await Review.findById(reviewId);
  if (!review) {
    return res.status(404).json({message: 'Failed to find review.'});
  }
  return res.status(200).json({message: 'Review fetched.', review: review});
};

//Delete a single review
async function deleteReview(req, res, next) {
  const reviewId = req.params.id;
  let loggedInUserID = req.user.userId;
  // console.log('loggedInUser', loggedInUserID);
  try {
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review && review.userId === loggedInUserID) {
      return res.status(404).json({ message: 'Could not find and delete review.'});
    }
    return res.status(200).json({ message: 'Deleted review', review: review});
  }
  catch (error) {
    res.status(500).json({ message: 'Could not delete review.'});
  }
};


module.exports = {getReviews, getReview, deleteReview, updateReview, createReview}

//Create review
// async function createReview(req, res, next) {
//   const review = new Review({
//     username: 'Darcee',
//     title: 'Treasure Island',
//     author: 'Robert Louis Stevenson',
//     rating: 1,
//     reviewSummary: 'Awesome book'
//   });
//   try {
//     await review.save();
//     return res.status(200).json({message: 'Created review successfully.', review: review});
//   } catch (error) {
//     return res.status(500).json({message: 'Failed to create review.'});
//   }
// };

//Get all reviews
// exports.getReviews = (req, res, next) => {
//   Review.find()
//   .then(reviews => {
//     res.status(200).json({message: 'Fetched reviews successfully.', reviews: reviews});
//   })
//   .catch(error => {
//     if (!error.statusCode) {
//       error.statusCode = 500;
//     }
//     next(error);
//   })
// };

//Get single review
// exports.getReview = (req, res, next) => {
//   const reviewId = req.params.id;
//   Review.findById(reviewId)
//     .then(review => {
//       if(!review) {
//         const error = new Error('Could not find post.');
//         error.statusCode = 404;
//         throw error;
//       }
//       res.status(200).json({message: 'Review fetched.', review: review});
//     })
//     .catch(error => {
//       if (!error.statusCode) {
//         error.statusCode = 500;
//       }
//       next(error);
//     });
// };

//Delete a review
// exports.deleteReview = (req, res, next) => {
//   const reviewId = req.params.reviewId;
//   Review.findById(reviewId)
//     .then(review => {
//       if(!review) {
//         const error = new Error('Could not find review.');
//         error.statusCode = 404;
//         throw error;
//       }
//       //check logged in user
//       return Review.FindByIdAndRemove(reviewId);
//     })
//     .then(result => {
//       console.log(result);
//       res.status(200).json({ message: 'Deleted review'});
//     })
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };
