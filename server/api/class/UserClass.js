const mongoose = require('mongoose');
const utils = require('../utils/utils');

async function CreateNewUser(data, token) {
    return new Promise(async (resolve, reject) => {
        let hashedPwd = await utils.hashPassword(data.password);
        resolve({
            _id: new mongoose.Types.ObjectId,
            username: data.username,
            email: data.email,
            validationToken: token,
            password: hashedPwd,
        })
    })

}

async function creatNewOauth2User(data) {
    return new Promise(async (resolve, reject) => {
        resolve({
            _id: new mongoose.Types.ObjectId,
            username: data.displayName,
            email: data.emails[0].value,
            googlePhoto: data.photos[0].value,
            validationToken: data.id,
            googleId: data.id,
            active: true,
        })
    })
}

async function creatNewOauth2UserVia42(userInfo) {
    return new Promise(async (resolve, reject) => {
        resolve({
            _id: new mongoose.Types.ObjectId,
            googleId: userInfo.id,
            googlePhoto: userInfo.photos[0].value,
            email: userInfo.emails[0].value,
            username: userInfo.displayName,
            validationToken: userInfo.id,
            active: true,
        })
    });
}

module.exports = {
    CreateNewUser,
    creatNewOauth2UserVia42,
    creatNewOauth2User
}