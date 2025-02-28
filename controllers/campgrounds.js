const Campground = require('../models/campgroundm');
const { cloudinary } = require('../cloudinary'); // it will import the cloudinary package from the cloudinary/index.js file
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

module.exports.index = async (req, res) => { // route to display all the campgrounds
    const campgrounds = await Campground.find({}) // it will find all the campgrounds in the database and populate the popupText array of the campground , popupText is the array of the campground that will be displayed when the marker is clicked
    res.render('campgrounds/index', { campgrounds });
    }

module.exports.renderNewForm = (req, res) => { // route to display the form to add a new campground
    res.render('campgrounds/new');
    }

module.exports.createCampground = async (req, res,next) => { // route to add a new campground by submitting the form
   // validateCampground is a middleware that will validate the data that is coming from the form
    const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 }); // it will take the location from the form and convert it into the coordinates
    const campground = new Campground(req.body.campground); // it will create a new campground by taking the data from the form
    campground.geometry = geoData.features[0].geometry; // it will store the coordinates of the location in the database
    // Campground is the model and req.body.campground is the data that we are getting from the form, .campground as we have given name="campground[name]" in the form
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename })); // it will store the images in the database by taking the path and filename of the image array 
    campground.author = req.user._id; // it will store the author id by user id of the user who is adding the campground in the database , it will check for authorisation
    await campground.save(); // it will save the campground in the database
    req.flash('success', 'Successfully made a new campground!'); // it will flash a success message when the campground is successfully added
    res.redirect(`/campgrounds/${campground._id}`);}
    
module.exports.showCampground = async (req, res) => { // route to display a single campground by its id
    const campground = await Campground.findById(req.params.id).populate({
       path : 'reviews',
         populate : {
              path : 'author'
         } // nested populate to populate the author of the review as their are two authors one for the campground and one for the review
    }).populate('author') // it will find the campground by its id and populate the reviews array of the campground
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground});   
    }

module.exports.renderEditForm = async (req, res) => { // route to display the form to edit a campground
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) { // if the campground is not found then it will throw an error
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    } 
    res.render('campgrounds/edit', { campground });
    }

module.exports.updateCampground = async (req, res) => { // route to update a campground by submitting the form by put request
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground }); // ... means we are spreading the data of req.body.campground i.e. name and location from campground
    const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
    campground.geometry = geoData.features[0].geometry;
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename })); // it will store the images in the database by taking the path and filename of the image array
    campground.images.push(...imgs); // it will push the images in the campground
    await campground.save(); 
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename); // it will delete the images from the cloudinary storage by taking the filename of the image array
        }
        await campground.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}}) // it will delete the images from the database by taking the filename of the image array

    }   
    req.flash('success', 'Successfully updated campground!'); // it will flash a success message when the campground is successfully
    res.redirect(`/campgrounds/${campground._id}`);
    }

module.exports.deleteCampground = async (req, res) => { // route to delete a campground , delete is to made available in id route
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground!'); // it will flash a success message when the campground is successfully deleted
    res.redirect('/campgrounds');
    }

 // image array has pathname,filename,size etc of the image