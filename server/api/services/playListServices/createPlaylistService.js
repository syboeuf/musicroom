const playListDao = require('../../daos/playListDao/playListDao');
const certificateDao = require('../../daos/certificateDao/certificateDao')

async function createPlaylist(req, res, data, user) {
    // console.log("data =: ", data);
    // TODO Add form validation
    // Check is all info exists

    if (!data || !user.id) {
        res.status(200).json({
            success: false,
            data: {
                msg: 'Eror on data'
            },
            code: 406
        })
    } else {
        let playList = await playListDao.createPlaylist(data, user.id);
        // TODO Add contributors to this list
        certificateDao.newCertificate(user.id, playList.id).then(certificate => {
            req.app.io.emit('newPlaylist', playList)
            req.app.io.emit('newCertificate', certificate)
            res.status(200).json({
                success: true,
                data: {
                    playlist: playList,
                    msg: "Playlist created with success !"
                },
                code: 200
            })
        }).catch(err => {
            res.status(200).json({
                success: false,
                data: {
                    msg: "Error Unknow Certificate " + err
                },
                code: 444
            })
        })
        // res.status(200).json({
        //     success: false,
        //     data: {
        //         msg: "Error Unknow Playlist" + err
        //     },
        //     code: 444
        // })

    }
}


module.exports = {
    createPlaylist
}