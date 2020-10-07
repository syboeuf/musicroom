const Event = require('../../models/event');
const EventClass = require("../../class/EventClass");
const userDao = require('../../daos/userDao/userDao');
const moment = require('moment')

const getEventById = (id) => {
    return new Promise((resolve, reject) => {
        Event.findById(id).exec()
            .then(response => {
                resolve(response);
            }).catch(err => {
                console.log("getEventById ERR :", err)
                reject(err)
            });
    })
}

const getAllPublicEvent = () => {
    return new Promise((resolve, reject) => {
        Event.find({ public: true }).exec()
            .then(response => {
                resolve(response);
            }).catch(err => {
                console.log("getEventById ERR :", err)
                reject(err)
            });
    })
}

const updateEvent = (Event) => {
    return new Promise(async (resolve, reject) => {
        getEventById(Event.id)
            .then(result => {
                if (result) {
                    result.set({ musics: Event.musics })
                    result.set({ creator: Event.creator })
                        .then(newEvent => {
                            resolve(newEvent)
                        })
                } else {
                    reject()
                }
            })
    })
}

const updateEventTracks = (id, track) => {
    return new Promise(async (resolve, reject) => {
        getEventById(id)
            .then(result => {
                result.trackList[track.position] = track;
                Event.findByIdAndUpdate(
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

const updateEventTracksPos = (id, tracks) => {
    return new Promise(async (resolve, reject) => {
        getEventById(id)
            .then(result => {
                result.trackList = tracks;
                Event.findByIdAndUpdate(
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

const createEventAsNew = (data, userId) => {
    return new Promise(async (resolve, reject) => {

        let event = new Event(await EventClass.CreateNewEvent(data, userId));
        event.save().then(res => {
            resolve(res);
        }).catch(err => {
            console.log("createEvent ERR :", err);
            reject(err);
        })
    })
}

const getMyevents = (userId) => {
    return new Promise((resolve, reject) => {
        Event.find({ creator: userId }).exec()
            .then(response => {
                resolve(response);
            }).catch(err => {
                console.log("getEventById ERR :", err)
                reject(err)
            });
    })
}

const deleteEvent = (id) => {
    return new Promise((resolve, reject) => {
        Event.findByIdAndDelete(id).exec()
            .then(response => {
                resolve(response);
            }).catch(err => {
                console.log("getEventById ERR :", err)
                reject(err)
            });
    })
}

const getInvitedEvents = (id) => {
    return new Promise(async (resolve, reject) => {
        let user = await userDao.getUserById(id);
        Event.find({ public: false, "contributors.contributor": {
            "$in": [user.email]
        } }).exec()
            .then(response => {
                console.log("response 11 :", response);
                resolve(response);
            }).catch(err => {
                console.log("getInvitedEvents ERR :", err)
                reject(err)
            });
    })
}

const delAllOutdatedEvents = () => {
    return new Promise((resolve, reject) => {
        // Add 2 hours for UTC + 2 
        Event.find({ dateEndEvent: { $lte: moment().add(2, 'hours').toDate() } }).limit(10000).exec()
            .then(response => {
                //  console.log(`delAllOutdatedEvents response :  ${moment().add(2, 'hours').toDate()}`, response);
                if (response)
                    response.forEach(ev => {
                        Event.findByIdAndDelete(ev.id).exec()
                            .then(res => {
                                // console.log('del : ', res);
                            }).catch(err => {
                                //console.log("delAllOutdatedEvents del ERR :", err)
                            });
                    })

            }).catch(err => {
                // console.log("delAllOutdatedEvents ERR :", err)
            });
    })
}

module.exports = {
    delAllOutdatedEvents,
    getMyevents,
    updateEvent,
    getInvitedEvents,
    updateEventTracks,
    updateEventTracksPos,
    getEventById,
    createEventAsNew,
    getAllPublicEvent,
    deleteEvent
}