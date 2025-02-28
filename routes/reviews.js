const express = require('express');
const router = express.Router({ mergeParams: true}); // it will merge the params of the campground and the review so that we can use the params of the campground in the review , it is not done by default in router
const reviews = require('../controllers/reviews');
const Campground = require('../models/campgroundm');
const Review = require('../models/review');
const catchAysnc = require('../utils/catchAysnc');
const ExpressError = require('../utils/ExpressErrors');
const { validateReview,isLoggedIn,isReviewAuthor } = require('../middleware');



router.post('/',isLoggedIn, validateReview, catchAysnc(reviews.createReview)); // route to add a review to a campground

router.delete('/:reviewId',isLoggedIn,isReviewAuthor, catchAysnc(reviews.deleteReview)); // route to delete a review from a campground

module.exports = router; // it will export the router