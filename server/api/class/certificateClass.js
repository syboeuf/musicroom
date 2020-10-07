const mongoose = require('mongoose');
const utils = require('../utils/utils');

async function CreateNewCertificate(userId, playlistId) {
    return new Promise(async (resolve, reject) => {
        resolve({
            _id: new mongoose.Types.ObjectId,
            userId: userId,
            playlistId: playlistId,
        })
    })
}


module.exports = {
    CreateNewCertificate
}