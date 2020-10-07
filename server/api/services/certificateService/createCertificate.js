const certificateDao = require('../../daos/certificateDao/certificateDao')

const createCertificate = (req, res, user, playlistId) => {
    if (!playlistId) {
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
                    certificateDao.newCertificate(data.user.id, playlistId).then(certificate => {
                        req.app.io.emit('newCertificate', certificate)
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
    createCertificate
}