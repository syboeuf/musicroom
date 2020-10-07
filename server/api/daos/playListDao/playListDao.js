const Playlist = require('../../models/Playlist');
const PlaylistClass = require("../../class/PlaylistClass");
const userDao = require('../../daos/userDao/userDao');

const getPlayListById = (id) => {
    return new Promise((resolve, reject) => {
        Playlist.findById(id).exec()
            .then(response => {
                resolve(response);
            }).catch(err => {
                console.log("getPlayListById ERR :", err)
                reject(err)
            });
    })
}

const getAllPublic = () => {
    return new Promise((resolve, reject) => {
        Playlist.find({ public: true }).exec()
            .then(response => {
                resolve(response);
            }).catch(err => {
                console.log("getPlayListById ERR :", err)
                reject(err)
            });
    })
}

const updatePlaylistData = (playlist) => {
    console.log("playlist :", playlist)
    return new Promise(async (resolve, reject) => {
        Playlist.findByIdAndUpdate(
            playlist.id,
            playlist,
            { new: true },
            (err, response) => {
                if (err) resolve(false);
                resolve(response);
            }
        )
    })
}

const updatePlaylistTracks = (id, track) => {
    return new Promise(async (resolve, reject) => {
        getPlayListById(id)
            .then(result => {
                result.trackList[track.position] = track;
                Playlist.findByIdAndUpdate(
                    result._id,
                    result,
                    { new: true },
                    (err, newTrackLikes) => {
                        if (err) resolve(false);
                        resolve(newTrackLikes);
                    }
                )
            })
    })
}

const updatePlaylistTracksPos = (id, tracks) => {
    return new Promise(async (resolve, reject) => {
        getPlayListById(id)
            .then(result => {
                result.trackList = tracks;
                Playlist.findByIdAndUpdate(
                    result._id,
                    result,
                    { new: true },
                    (err, response) => {
                        if (err) resolve(false);
                        resolve(response);
                    }
                )
            })
    })
}

const createPlaylist = (data, userId) => {
    return new Promise(async (resolve, reject) => {
        let playList = new Playlist(await PlaylistClass.CreateNewPlaylist(data, userId));
        playList.save().then(res => {
            console.log("res :", res)
            resolve(res);
        }).catch(err => {
            console.log("createPlaylist ERR :", err);
            reject(err);
        })
    })
}

const getMine = (userId) => {
    return new Promise((resolve, reject) => {
        Playlist.find({ creator: userId }).exec()
            .then(response => {
                resolve(response);
            }).catch(err => {
                console.log("getPlayListById ERR :", err)
                reject(err)
            });
    })
}

const deletePlaylist = (id) => {
    return new Promise((resolve, reject) => {
        Playlist.findByIdAndDelete(id).exec()
            .then(response => {
                resolve(response);
            }).catch(err => {
                console.log("getPlayListById ERR :", err)
                reject(err)
            });
    })
}

const getInvitedPlaylist = (id) => {
    return new Promise(async (resolve, reject) => {
        let user = await userDao.getUserById(id);
       
        Playlist.find({ public: false, "contributors.contributor": {
            "$in": [user.email]
        } }).exec()
            .then(response => {
                resolve(response);
            }).catch(err => {
                console.log("getPlayListById ERR :", err)
                reject(err)
            });
    })
}

module.exports = {
    getMine,
    getInvitedPlaylist,
    updatePlaylistData,
    updatePlaylistTracks,
    updatePlaylistTracksPos,
    getPlayListById,
    createPlaylist,
    getAllPublic,
    deletePlaylist
}