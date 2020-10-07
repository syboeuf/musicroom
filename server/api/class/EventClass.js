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

async function CreateNewEvent(data, userId) {

    return new Promise(async (resolve, reject) => {
        let endDay = parseInt(data.dateEndEvent.substring(0, 2));
        let endMonth = parseInt(data.dateEndEvent.substring(3, 5));
        let endYear = parseInt(data.dateEndEvent.substring(6, 10));
        let endHour = parseInt(data.dateEndEvent.substring(11, 13));
        let endMin = parseInt(data.dateEndEvent.substring(14, 16));
        let endSec = parseInt(data.dateEndEvent.substring(17, 19));

        let startDay = parseInt(data.dateStartEvent.substring(0, 2));
        let startMonth = parseInt(data.dateStartEvent.substring(3, 5));
        let startYear = parseInt(data.dateStartEvent.substring(6, 10));
        let startHour = parseInt(data.dateStartEvent.substring(11, 13));
        let startMin = parseInt(data.dateStartEvent.substring(14, 16));
        let startSec = parseInt(data.dateStartEvent.substring(17, 19));

        //19/07/2020 23:35:07
        // console.log(startDay, startMonth, startYear, startHour, startMin, startSec);

        resolve({
            _id: new mongoose.Types.ObjectId,
            name: data.name,
            public: data.isPrivate ? false : true,
            creator: userId,
            desctiption: data.description,
            trackList: await prepareTrackList(data.trackList),
            contributors: data.contributors,
            isEditable: data.isEditable,
            address: data.address,
            isVote: data.isVote,
            dateEndEvent: new Date(endYear, endMonth - 1, endDay, endHour, endMin, endSec),
            dateStartEvent: new Date(startYear, startMonth - 1, startDay, startHour, startMin, startSec),
        })
    })
}


module.exports = {
    CreateNewEvent
}