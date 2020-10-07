const mongoose = require('mongoose');
const utils = require('../utils/utils');

async function CreateNewBookmark(userId, data) {
    return new Promise(async (resolve, reject) => {
        resolve({
            _id: new mongoose.Types.ObjectId,
            userId: userId,
            playlistId: data.playlistId,
            playlistName: data.playlistName,
        })
    })
}


module.exports = {
    CreateNewBookmark
}