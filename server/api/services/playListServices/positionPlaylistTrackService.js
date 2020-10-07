const playListDao = require('../../daos/playListDao/playListDao');
const eventDao = require('../../daos/eventDao/eventDao');

async function positionPlaylistTrack(res, user, data) {
    let response = await playListDao.updatePlaylistTracksPos(data._id, data.trackList);
    if (response){
        res.status(200).json({
            success: true,
            data: {
                msg: "positions updated !"
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


// Event
async function positionEventTrack(res, user, data) {
    let response = await eventDao.updateEventTracksPos(data._id, data.trackList);
    if (response){
        res.status(200).json({
            success: true,
            data: {
                msg: "positions updated !"
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
    positionPlaylistTrack,
    positionEventTrack
}