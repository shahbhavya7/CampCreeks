const { campgroundSchema} = require('./schemas.js');
const ExpressError = require('./utils/ExpressErrors');
const Campground = require('./models/campgroundm');
const Review = require('./models/review');
const { reviewSchema } = require('./schemas.js');

module.exports.isLoggedIn = (req, res, next) => { // it is a middleware that will check if the user is logged in or not
    if (!req.isAuthenticated()) { // if the user is not authenticated then it will flash an error message and redirect to the login page
        req.session.returnTo = req.originalUrl; // it will store the page from where the user was redirected to the login page
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    } // returnTo is a key that is stored in the session and the value is the page from where the user was redirected to the login page
    // originalUrl is the page from where the user was redirected to the login page
    next();
}
// isAuthenticated is a method that is provided by passport which will check if the user is authenticated or not
// this middleware protects the routes that are only accessible to the logged in users

 // exporting the middleware so that it can be used in other files

 module.exports.storeReturnTo = (req, res, next) => { 
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}
module.exports.validateCampground = (req, res, next) => { // this is a middleware that will validate the data that is coming from the form
    const { error } = campgroundSchema.validate(req.body);
    if (error) { // if there is an error in the data then it will throw an error
        const msg = error.details.map(el => el.message).join(',')  // it will map all the error messages and store it in msg as it is in array
        throw new ExpressError(msg, 400)
    } else {
        next(); // if there is no error then it will move to the next middleware
    }
}

module.exports.isAuthor = async (req, res, next) => { // it is a middleware that will check for authorisation
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if(!campground.author.equals(req.user._id)) { // it will check if the author id of the campground is equal to the user id of the user who is updating the campground
        req.flash('error', 'You do not have permission to do that!'); // if the author id of the campground is not equal to the user id of the user who is updating the campground then it will throw an error
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
} // it first finds the campground by id then checks if user_id of person who is trying to update the campground equal to person who authored or created the campground
// if not then it will throw an error and redirect to the campground page
// user_.id comes from passport , it assigns userid to every user who is logged in and it is stored in req.user._id

module.exports.isReviewAuthor = async (req, res, next) => { // it is a middleware that will check for authorisation
    const { id, reviewId } = req.params; // it will destructure the id and reviewId from the req.params
    const review = await Review.findById(reviewId); // it will find the review by its id
    if(!review.author.equals(req.user._id)) { // it will check if the author id of the review is equal to the user id of the user who is updating the review
        req.flash('error', 'You do not have permission to do that!'); // if the author id of the review is not equal to the user id of the user who is updating the review then it will throw an error
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
} // it first finds the review by id then checks if user_id of person who is trying to update the review equal to person who authored or created the review

module.exports.validateReview = (req, res, next) => { // this is a middleware that will validate the data that is coming from the form
    const { error } = reviewSchema.validate(req.body); // it will validate the data that we are getting from the form
    if(error){ // if there is an error in the data then it will throw an error
        const msg = error.details.map(el => el.message).join(','); // it will map all the error messages and store it in msg as it is in array
        throw new ExpressError(msg, 400);
    } else{
        next(); // if there is no error then it will move to the next middleware
    }
} //  this is not required for client side as bootstrap will take care of it but it is required for server side validation if someone tries to bypass the client side validation
// by using postman or any other tool