const playListDao = require('../../daos/playListDao/playListDao');

async function getListPlaylist(res, user) {
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
        let publicList = await playListDao.getAllPublic();
        let myPlaylist = await playListDao.getMine(user.id);
        let getInvitedPl = await playListDao.getInvitedPlaylist(user.id);

        res.status(200).json({
            success: true,
            data: {
                publicList,
                myPlaylist,
                getInvitedPl,
            },
            code: 200
        })
        // Get all private playList 'invited'
        // Get all this user private playList
    }
}

module.exports = {
    getListPlaylist,
}