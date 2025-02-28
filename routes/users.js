const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAysnc');
const passport = require('passport');
const {storeReturnTo} = require('../middleware');
const users = require('../controllers/users');

router.route('/register') // routes with the same path can be written together using route method , routes which are not written together are written separately
    .get(users.renderRegister) // it will render the register form
    .post(catchAsync(users.register)); // it will register the user

router.route('/login') // routes with the same path can be written together using route method
    .get(users.renderLogin) // it will render the login form
    .post(storeReturnTo,passport.authenticate('local',{failureFlash:true ,failureRedirect: '/login'}), users.login); // it will login the user

// passport.authenticate is a middleware which will authenticate the user using the local strategy and it will take the username and password from the req.body automatically
// failureFlash : true means if the user is not authenticated then it will flash the error message
// failureRedirect : '/login' means if the user is not authenticated then it will redirect to the login page
// no need to write the code for the authentication as it is done by passport.authenticate

router.get('/logout', users.logout); // it will logout the user

module.exports = router;