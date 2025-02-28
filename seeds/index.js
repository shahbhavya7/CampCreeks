const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campgroundm');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]; // it will generate a random number between 0 and 1 and
//then multiply it with the length of the array and then round it off to the nearest integer whoch will be the index of the array
// it is used to generate a random element from the array of elements
const price = Math.floor(Math.random() * 20) + 10; // it will generate a random number between 10 and 30

const seedDB = async () => {
    await Campground.deleteMany({}); // it will delete all the campgrounds in the database for every server restart and then add the new campgrounds
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000); // it will generate a random number between 0 and 1000
        const camp = new Campground({
            author : '668ff4945b4318a90d1f39e7', 
            location: `${cities[random1000].city}, ${cities[random1000].state}`, // it will generate any 50 random city and state from the cities.js file and store them in database
            title: `${sample(descriptors)} ${sample(places)}`, // it will generate a random title for the campground from the seedHelpers.js file
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt harum unde accusantium reprehenderit dolorem, laborum non velit quam obcaecati tempore consequuntur aspernatur aliquid voluptatibus officiis, veniam voluptatum dolorum expedita magni.',
            price: price, // it will generate a random price for the campground between 10 and 30
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
          },
            images:  [
                {
                  url: 'https://res.cloudinary.com/dowjsprfx/image/upload/v1720946044/YelpCamp/ewd4eugustenggc87elc.jpg',
                  filename: 'YelpCamp/ewd4eugustenggc87elc'
                },
                {
                  url: 'https://res.cloudinary.com/dowjsprfx/image/upload/v1720946045/YelpCamp/ixgzoyozix7jgniymkey.jpg',
                  filename: 'YelpCamp/ixgzoyozix7jgniymkey'
                }
              ]
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
}); // it will close the connection after the campgrounds are added to the database
