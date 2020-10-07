const eventDao = require('../../daos/eventDao/eventDao');
const certificateDao = require('../../daos/certificateDao/certificateDao')

async function createEvent(res, user, data) {
    // console.log("data =: ", data);
    // TODO Add form validation
    // Check is all info exists

    /**
     *    name: title,
      description,
      trackList, // Musique
      creator, // id of user
      _id, // id of playList
      contributors,
      isPrivate,
      dateStartEvent: `${formatDate(startDate)} ${formatHour(startDate)}`, // dd/mm/yyyy hh:mm:ss
      dateEndEvent: `${formatDate(endDate)} ${formatHour(endDate)}`, // dd/mm/yyyy hh:mm:ss
      address,
      isVote,
      isEditable,
     */

    if (!data || !user.id || !data.dateEndEvent || !data.dateStartEvent || !data.description) {
        res.status(200).json({
            success: false,
            data: {
                msg: 'Error on data'
            },
            code: 406
        })
    } else {
        let event = await eventDao.createEventAsNew(data, user.id);
        // TODO Add contributors to this list
        res.status(200).json({
            success: true,
            data: {
                playlist: event,
                msg: "event created with success !"
            },
            code: 200
        })
        // certificateDao.newCertificate(user.id, playList.id).then(certificate => {
        //     req.app.io.emit('newPlaylist', playList)
        //     req.app.io.emit('newCertificate', certificate)

        // }).catch(err => {
        //     res.status(200).json({
        //         success: false,
        //         data: {
        //             msg: "Error Unknow Certificate " + err
        //         },
        //         code: 444
        //     })
        // })
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
    createEvent
}