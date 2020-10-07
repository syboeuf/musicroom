let mongoose = require('mongoose');

// Playlist schema
let musicSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    vote: {
        type: Number,
        default: 0,
    },
    locked: {
        type: Boolean,
        default: false,
    },
    data: {
        default: {},
    },
    dateOfCreation: {
        type: Date,
        default: Date.now,
    },
    dateOfLastUpdate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Music', musicSchema);