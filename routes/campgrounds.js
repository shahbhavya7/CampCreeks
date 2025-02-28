const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAysnc = require('../utils/catchAysnc');
const { isLoggedIn,isAuthor,validateCampground } = require('../middleware');
const multer = require('multer'); // this module is used to upload the files like images, videos etc to the server
const { storage } = require('../cloudinary'); // it will import the storage from the cloudinary/index.js file
const upload = multer({ storage }); // it will use the storage to upload the files to the server



// check the controller file and routes file simultaneously to understand the flow of the code

router.route('/') // routes with the same path can be written together using route method , routes which are not written together are written separately
    .get(catchAysnc(campgrounds.index)) // route to display all the campgrounds
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAysnc(campgrounds.createCampground)) // route to add a new campground
 
    // upload.array('image') is a middleware which is used to upload the files to the server, it will upload the files to the uploads folder in the root directory

router.get('/new', isLoggedIn, campgrounds.renderNewForm); // route to display the form to add a new campground

router.route('/:id') // routes with the same path can be written together using route method
    .get(catchAysnc(campgrounds.showCampground)) // route to display a specific campground
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAysnc(campgrounds.updateCampground))
    .delete(isLoggedIn,isAuthor,catchAysnc(campgrounds.deleteCampground)); // route to delete a campground


router.get('/:id/edit', isLoggedIn,isAuthor,catchAysnc(campgrounds.renderEditForm)); // route to display the form to edit a campground

module.exports = router; // it will export the routery