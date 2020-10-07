const certificateDao = require('../../daos/certificateDao/certificateDao')
const certificate = require('../../models/certificate')

const getMyCertificate = (user, res) => {
    certificateDao.getMyCertificate(user.id)
        .then(certificate => {
            res.status(200).json({
                success: true,
                data: {
                    certificateArray: certificate
                },
                code: 406
            })

        })
}

module.exports = {
    getMyCertificate
}