const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
    }

module.exports.register =async (req, res,next) => {
    try{
    const { email, username, password } = req.body;
    const user = new User({ email, username }); // creating a new user with email and username , password will be hashed by passport-local-mongoose
    const registeredUser = await User.register(user, password); // we are registering the user with the hashed password using passport-local-mongoose in the database
    req.login(registeredUser, err => { // it is a method that is provided by passport to login the user as soon as the user is registered
        if (err) return next(err);
        req.flash('success', 'Welcome to Yelp Camp');
        res.redirect('/campgrounds');
    });
 } catch(e){
        req.flash('error', e.message);
        res.redirect('register');
    }
    }

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
    }

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back');
    const redirectUrl = res.locals.returnTo || '/campgrounds';  // it will redirect the user to the page from where the user was redirected to the login page , the page is stored in the session as returnTo , we get is by req.locals.returnTo , locals is a key that is stored in the res object
    delete req.session.returnTo; // it will delete the returnTo from the session so that the user is not redirected to the same page again and again after logging in
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res,next) => {
    req.logout(function (err) { // it is a method that is provided by passport to logout the user it requires a callback function which will take an error as an argument
        if (err) {
            return next(err);
        }
    req.flash('success', 'Goodbye');
    res.redirect('/campgrounds');
    });
}