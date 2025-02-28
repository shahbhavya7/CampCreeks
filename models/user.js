const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true // it should be unique
    }
});

UserSchema.plugin(passportLocalMongoose); // it will add username and password to the schema and hash the password , all this handled by passport-local-mongoose

module.exports = mongoose.model('User', UserSchema); // it will export the model User with the schema UserSchema