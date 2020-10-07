const certificateDao = require('../../daos/certificateDao/certificateDao')

const deleteCertificate = (req, res, user, playlistId) => {
    if (!dplaylistId) {
        res.status(200).json({
            success: false,
            data: {
                msg: 'Eror on data'
            },
            code: 406
        })
    } else
        certificateDao.testCertificate(user.id, playlistId)
            .then(haveCertificate => {
                if (haveCertificate) {
                    certificateDao.deleteCertificate(data.user.id, playlistId).then(certificate => {
                        req.app.io.emit('deleteCertificate', certificate)
                        res.status(200).json({
                            success: true,
                            data: {
                                certificate: certificate
                            },
                            code: 200
                        })
                    })
                } else {
                    res.status(200).json({
                        success: false,
                        data: {
                            msg: 'Error you dont have certificate'
                        },
                        code: 406
                    })
                }
            })
}

module.exports = {
    deleteCertificate
}