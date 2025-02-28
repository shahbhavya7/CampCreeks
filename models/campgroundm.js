const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

const ImageSchema = new Schema({ // this is to use cloudinary api on each image
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () { // this is to use cloudinary api on each image , thumbnail is used to display the image in the thumbnail size in the show page, it is cloudinary api property
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } }; // this is used to display the virtual properties in the json format

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: { // this is used to store the location of the campground in the database
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author : { // we save user id of person who is adding the campground in the author field for assigning each campground to a user who is adding it
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [ // connecting the review model with the campground model by using the reference of the review model
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function () { // this is used to display the popup on the map of the campground
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0, 20)}...</p>` // it will display the title and description of the campground in the popup , description is limited to 20 characters
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) { // if the campground is deleted then only it will delete the reviews
        await Review.deleteMany({ // it will delete the reviews of the campground
            _id: {
                $in: doc.reviews // it will delete the reviews of the campground by its id , $in is used to delete the reviews of the campground by its id
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);