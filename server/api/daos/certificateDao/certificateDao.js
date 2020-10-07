const Certificate = require('../../models/certificate');
const CertificateClass = require("../../class/certificateClass");

const newCertificate = (userId, playListId) => {
    return new Promise(async (resolve, reject) => {
        let certificate = new Certificate(await CertificateClass.CreateNewCertificate(userId, playListId));
        certificate.save().then(res => {
            resolve(certificate);
        }).catch(err => {
            console.log("newCertificate ERR :", err);
            reject(err);
        })
    })
}

const testCertificate = (userId, playListId) => {
    return new Promise(async (resolve, reject) => {
        Certificate.findOne({ userId: userId, playlistId: playListId }).exec()
            .then(res => {
                if (res)
                    resolve(true);
                else
                    resolve(false)
            }).catch(err => {
                console.log("testCertificate ERR :", err);
                reject(err);
            })
    })
}

const deleteCertificate = (userId, playListId) => {
    return new Promise(async (resolve, reject) => {
        Certificate.findOneAndDelete({ userId: userId, playlistId: playListId }).exec()
            .then(res => {
                if (res)
                    resolve(res);
                else
                    resolve(false)
            }).catch(err => {
                console.log("deleteCertificate ERR :", err);
                reject(err);
            })
    })
}

const getMyCertificate = (id) => {
    return new Promise(async (resolve, reject) => {
        Certificate.find({ userId: id }).exec()
            .then(res => {
                resolve(res);
            }).catch(err => {
                console.log("getMyCertificate ERR :", err);
                reject(err);
            })
    })
}


module.exports = {
    getMyCertificate,
    newCertificate,
    testCertificate,
    deleteCertificate
}