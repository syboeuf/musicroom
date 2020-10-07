const playListDao = require('../../daos/playListDao/playListDao');
const eventDao = require('../../daos/eventDao/eventDao');

async function getPlaylistById(res, id) {
    if (String(id).length !== 24)
        res.status(200).json({
            success: false,
            data: {
                msg: "Bad id format"
            },
            code: 406
        })
    else
        playListDao.getPlayListById(id).then(data => {
            if (data) {
                res.status(200).json({
                    success: true,
                    data: {
                        playList: data
                    },
                    code: 200
                })
            } else {
                res.status(200).json({
                    success: false,
                    data: {
                        msg: "Playlist not found"
                    },
                    code: 202
                })
            }
        }).catch(err => {
            res.status(200).json({
                success: false,
                data: {
                    msg: "Error Unknow " + err
                },
                code: 444
            })
        })
}

async function getAllPublicPlaylist(res) {
    playListDao.getAllPublic().then(data => {
        if (data) {
            res.status(200).json({
                success: true,
                data: {
                    playListArray: data
                },
                code: 200
            })
        } else {
            res.status(200).json({
                success: false,
                data: {
                    msg: "error data"
                },
                code: 202
            })
        }
    }).catch(err => {
        res.status(200).json({
            success: false,
            data: {
                msg: "Error Unknow " + err
            },
            code: 444
        })
    })
}

function getMine(user, res) {
    playListDao.getMine(user.id).then(data => {
        if (data) {
            res.status(200).json({
                success: true,
                data: {
                    playListArray: data
                },
                code: 200
            })
        } else {
            res.status(200).json({
                success: false,
                data: {
                    msg: "error data"
                },
                code: 202
            })
        }
    }).catch(err => {
        res.status(200).json({
            success: false,
            data: {
                msg: "Error Unknow " + err
            },
            code: 444
        })
    })
}

// Event services

async function getEventInfoById(res, id) {
    if (String(id).length !== 24)
        res.status(200).json({
            success: false,
            data: {
                msg: "Bad id format"
            },
            code: 406
        })
    else
        eventDao.getEventById(id).then(data => {
            if (data) {
                res.status(200).json({
                    success: true,
                    data: {
                        playList: data
                    },
                    code: 200
                })
            } else {
                res.status(200).json({
                    success: false,
                    data: {
                        msg: "Playlist not found"
                    },
                    code: 202
                })
            }
        }).catch(err => {
            res.status(200).json({
                success: false,
                data: {
                    msg: "Error Unknow " + err
                },
                code: 444
            })
        })
}

module.exports = {
    getPlaylistById,
    getAllPublicPlaylist,
    getMine,
    getEventInfoById
}