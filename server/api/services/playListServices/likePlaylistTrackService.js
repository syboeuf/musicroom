const eventDao = require('../../daos/eventDao/eventDao');
const playListDao = require('../../daos/playListDao/playListDao');

async function likePlaylistTrack(res, user, data) {
    let response = await playListDao.updatePlaylistTracks(data.id, data.track);
    console.log("response :", response);
    if (response){
        res.status(200).json({
            success: true,
            data: {
                msg: "likes updated !"
            },
            code: 200
        })
    } else {
        res.status(200).json({
            success: true,
            data: {
                msg: "An error occured !"
            },
            code: 500
        })
    }
}

// Like event

async function likeEventTrack(res, user, data) {
    let response = await eventDao.updateEventTracks(data.id, data.track);
    console.log("response event :", response);
    if (response){
        res.status(200).json({
            success: true,
            data: {
                msg: "likes updated !"
            },
            code: 200
        })
    } else {
        res.status(200).json({
            success: true,
            data: {
                msg: "An error occured !"
            },
            code: 500
        })
    }
}


module.exports = {
    likePlaylistTrack,
    likeEventTrack
}