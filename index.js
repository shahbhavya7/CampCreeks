if(process.env.NODE_ENV !== 'production') { // it will check if the environment is not production then it will require the dotenv package and then it will configure the dotenv package
    require('dotenv').config(); // it is done to hide the sensitive information like api keys, passwords etc from the public and to keep them in the .env file
    } // the .env file is not pushed to the github as it contains the sensitive information it will only be available to the developer in the local machine
    // index.js will automatically fetch data from env file though index.js is in github but the env file is not in github  so the sensitive information is not available to the public

const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressErrors');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize'); // it is used to prevent the mongo injection i.e it will remove the dollar sign and dot from the req.body, req.query and req.params , these are the places where the mongo injection attacks can happen
const userRoutes = require('./routes/users');
const campgroundsRoutes = require('./routes/campgrounds');
const reviewsRoutes = require('./routes/reviews');  



const MongoDBStore = require('connect-mongo')(session); // it is used to store the session in the database so that the session is not lost when the server is restarted

const dbUrl = process.env.DB_URL  // it will check if the environment is production then it will use the db url from the environment otherwise it will use the local db url
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
    });

const app = express();

app.engine('ejs', ejsMate); // ejsMate is used to make the ejs files more readable and easy to write
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true })); // to parse the form data and add it to the req.body which shows the data in the console
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'))); // it is used to serve the static files like css, js, images etc , public is the folder where all the static files like css, js, images etc are stored
app.use(mongoSanitize()); // it is used to prevent the mongo injection i.e it will remove the dollar sign and dot from the req.body, req.query and req.params , these are the places where the mongo injection attacks can happen
app.use(helmet()); // it is used to secure the app by setting various http headers like content security policy, xss filter, xss protection, frameguard etc

const scriptSrcUrls = [ // helmet will only allow the scripts from these sources to run in the app
    "https://stackpath.bootstrapcdn.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/", // add this
];
const styleSrcUrls = [ // helmet will only allow the styles from these sources to run in the app
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/", // add this
];
const connectSrcUrls = [ // helmet will only allow the connections from these sources to run in the app
    "https://api.maptiler.com/", // add this
];

const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({ // helmet will restrict the sources from where the data can be loaded in the app to avoid the xss attacks
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dowjsprfx/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
                "https://api.maptiler.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

const store = new MongoDBStore({ // it is used to store the session in the database so that the session is not lost when the server is restarted
    url: dbUrl, // it is the url of the database where the session will be stored
    secret : 'thisshouldbesecret',
    touchAfter : 24 * 60 * 60 // it will update the session after 24 hours
    });

store.on('error', function(e) { // it will handle the error if there is any error in the session
    console.log('Session Store Error', e);
    });

const sessionConfig = {
    store, // it is the store where the session is stored , it will now store the session in the mongo database
    name : 'session', // it is the name of the cookie
    secret  : 'thisshouldbeabettersecret',
    resave : false,
    saveUninitialized : true,
    cookie : {
        httpOnly : true, // it will make the cookie secure i.e it will only be sent over https
       // secure: false, // it will make the cookie secure i.e it will only be sent over https
        expires : Date.now() + 1000 * 60 * 60 * 24 * 7, // it will expire the cookie after 7 days from now
        maxAge : 1000 * 60 * 60 * 24 * 7  // it means the cookie will expire after 7 days
        }
    }
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize()); // it will initialize the passport package and it will be used to authenticate the user 
app.use(passport.session()); // it will use the passport session i.e it will maintain the session of the user
passport.use(new LocalStrategy(User.authenticate())); // it will use the local strategy to authenticate the user

passport.serializeUser(User.serializeUser()); // it will serialize the user i.e it will store the user in the session
passport.deserializeUser(User.deserializeUser()); // it will deserialize the user i.e it will remove the user from the session 

app.use((req, res, next) => {
    res.locals.currentUser = req.user; // it will make the user available to all the templates 
    res.locals.success = req.flash('success'); // it will make the success message available to all the templates
    res.locals.error = req.flash('error'); // it will make the error message available to all the templates
    next();
}); // it will make the success message available to all the templates


app.use('/', userRoutes); // it will use the userRoutes for the routes that are defined in the userRoutes
app.use('/campgrounds', campgroundsRoutes); // it will use the campgroundsRoutes for the routes that are defined in the campgroundsRoutes
app.use('/campgrounds/:id/reviews', reviewsRoutes);

app.get('/', (req, res) => {
    res.render('home');
    });

app.all('*', (req, res, next) => { // this is a middleware that will run for all the routes that are not defined
    next(new ExpressError('Page Not Found', 404)); // it will send the error to the error handling middleware
    }); 

app.use((err, req, res, next) => { // this is our own error handling middleware it will receive the error from the previous middleware and then send the error to the client 
    const { statusCode = 500, message  = 'something went wrong' } = err; // it will destructure the error object and get the status code and message from it
    // and default status code is 500 and message is something went wrong
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'; // if there is no message in the error object then it will set the message to Oh No, Something Went Wrong!
    res.status(statusCode).render('error' , {err}); // it will send the status code and message to the client
    }); 

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    });

// catchAysnc function's catch catches the error in form of next and then sends it to the error handling middleware 1 i.e app.all , at the middleware app.all 
// it receives the signal that error is there which leads to throwing the error by creating a new instance of ExpressError which will categorize the 
//error code i.e 404 and message and store it in the error object
// this error object is then sent to the error handling middleware 2 i.e app.use which will receive the error object and then destructure it to get the status code and message from it
// and then send the status code and message to the client


// everything from assigning the user registertion id to the user to the session and deserializing the user from the session is done by passport
// the password is also hashed and saved in the database by passport only