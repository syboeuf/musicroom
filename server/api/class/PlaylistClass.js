const mongoose = require('mongoose');
const utils = require('../utils/utils');

const prepareTrackList = async (list) => {
    return new Promise(async (resolve, reject) => {
        if (list && list.length > 0) {
            list.map((l, i) => {
                l.likes = []; 
                l.position = i;
            });
            resolve(list);
        } else resolve([])
    })
}

async function CreateNewPlaylist(data, userId) {

    return new Promise(async (resolve, reject) => {
        resolve({
            _id: new mongoose.Types.ObjectId,
            name: data.titlePlayList,
            public: data.isPrivate ? false : true,
            creator: userId,
            desctiption: data.description,
            trackList: await prepareTrackList(data.trackList),
            contributors: data.contributors,
            isEditable: data.isEditable,
            isVote: data.isVote
        })
    })
}


module.exports = {
    CreateNewPlaylist
}