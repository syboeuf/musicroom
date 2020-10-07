const eventDao = require('../../daos/eventDao/eventDao');

async function getEvents(res, user) {
    //  This is for my local tests  
    // let id ="5f141ffe90684300473be91c";

    // if (String(id).length !== 24)
    if (String(user.id).length !== 24)
        res.status(200).json({
            success: false,
            data: {
                msg: "Bad id format"
            },
            code: 406
        })
    else {
        // Get all public playlist
        let publicEvent = await eventDao.getAllPublicEvent();
        let myEvent = await eventDao.getMyevents(user.id);
        let getInvitedEv = await eventDao.getInvitedEvents(user.id);

        res.status(200).json({
            success: true,
            data: {
                publicEvent,
                myEvent,
                getInvitedEv,
            },
            code: 200
        })
    }
}

module.exports = {
    getEvents,
}