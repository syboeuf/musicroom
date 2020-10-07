let mongoose = require('mongoose');

// User schema
let userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: {
        type: String,
        default: "",
    },
    lastname: {
        type: String,
        default: "",
    },
    username: {
        type: String,
        require: true,
    },
    email: String,
    emailSwap: String,
    password: {
        type: String,
    },
    validationToken: {
        type: String,
    },
    dateOfCreation: {
        type: Date,
        default: Date.now,
    },
    googlePhoto: {
        type: String,
    },
    age: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    googleId: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false
    },
    blocked: {
        type: Boolean,
        default: false,
    },
    musicStyle: {
        type: String,
        default: ""
    },
    dateOfLastUpdate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
    },
    city: {
        type: String,
    },
    age: {
        type: Number,
    },
    musicStyle: {
        type: String,
    }
});

module.exports = mongoose.model('User', userSchema);