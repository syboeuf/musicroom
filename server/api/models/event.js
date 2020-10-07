let mongoose = require('mongoose');

// event schema
let eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        default: "",
    },
    desctiption: {
        type: String,
        default: "",
    },
    public: {
        type: Boolean,
        default: true,
    },
    creator: {
        type: String,
        default: "",
    },
    address: {
        type: Object,
        default: {},
    },
    isEditable: {
        type: Boolean,
        default: false,
    },
    isVote: {
        type: Boolean,
        default: true,
    },
    trackList: {
        type: Array,
        default: [],
    },
    dateStartEvent: {
        type: Date,
        require: true
    },
    dateEndEvent: {
        type: Date,
        require: true
    },
    contributors: {
        type: Array,
        default: []
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

module.exports = mongoose.model('Event', eventSchema);