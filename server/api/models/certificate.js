let mongoose = require('mongoose');

// Playlist schema
let certificateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: String,
        require: true,
    },
    playlistId: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('Certificate', certificateSchema);