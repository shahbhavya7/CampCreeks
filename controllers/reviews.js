const Campground = require('../models/campgroundm');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => { // route to add a review to a campground
    const campground = await Campground.findById(req.params.id) // it will find the campground by its id
    const review = new Review(req.body.review); // it will create a new review by taking data from req.body.review
    review.author = req.user._id; // it will set the author of the review to the user who is logged in
    campground.reviews.push(review); // it will push the review to the reviews array of the campground
    await review.save(); // it will save the review in the database
    await campground.save(); // it will save the campground in the database
    req.flash('success', 'Created new review!'); // it will flash a success message when the review is successfully
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async (req, res) => { // route to delete a review from a campground
    const { id, reviewId } = req.params; // it will destructure the id and reviewId from the req.params
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // it will pull the review from the reviews array of the campground by its id
    await Review.findByIdAndDelete(reviewId); // it will delete the review by its id
    req.flash('success', 'Successfully deleted review!'); // it will flash a success message when the review is successfully deleted
    res.redirect(`/campgrounds/${id}`);
}