const User = require('../../models/User');
const utils = require('../../utils/utils');
const userClass = require('../../class/UserClass');
const AccessToken = require('../../class/accessTokenClass');

async function loginOauth2User(res, userInfo) {
    const accessTokenDao = new AccessToken();

    User.find({
        "email": userInfo.emails[0].value
    })
        .exec()
        .then(async usrOne => {
            if (usrOne.length === 0) {
                let user = new User(await userClass.creatNewOauth2User(userInfo));
                const token = await accessTokenDao.generateToken(user._id, userInfo.id);
                const accessTokenValue = await accessTokenDao.saveTokenAndGetAccessToken(token, user._id);
                const basedAccesstoken = await accessTokenDao.generateToken(accessTokenValue, user._id);

                user.save()
                    .then(async usr => {
                        res.redirect("msrm42app://msrm42app.io?token=" + basedAccesstoken +
                            "&userId=" + usr._id + "&givenName=" +
                            usr.username);
                    })
                    .catch(err => utils.defaultError(res, err));
            } else {
                const token = await accessTokenDao.generateToken(usrOne[0]._id, usrOne[0]._id);
                const accessTokenValue = await accessTokenDao.saveTokenAndGetAccessToken(token, usrOne[0]._id);
                const basedAccesstoken = await accessTokenDao.generateToken(accessTokenValue, usrOne[0]._id);

                res.redirect("msrm42app://msrm42app.io?token=" + basedAccesstoken +
                    "&userId=" + usrOne[0]._id + "&givenName=" +
                    usrOne[0].username);
            }
        })
        .catch(err => utils.defaultError(res, err))
}

async function loginOauth2UserVia42(res, userInfo) {
    const accessTokenDao = new AccessToken();

    User.find({
        "email": userInfo.emails[0].value
    })
        .exec()
        .then(async usrOne => {
            if (usrOne.length === 0) {
                let user = new User(await userClass.creatNewOauth2UserVia42(userInfo));
                user.save()
                    .then(async usr => {
                        const token = await accessTokenDao.generateToken(usr._id, usr._id);
                        const accessTokenValue = await accessTokenDao.saveTokenAndGetAccessToken(token, usr._id);
                        const basedAccesstoken = await accessTokenDao.generateToken(accessTokenValue, usr._id);

                        res.redirect("msrm42app://msrm42app.io?token=" + basedAccesstoken +
                            "&userId=" + usr._id + "&givenName=" +
                            usr.username);
                    })
                    .catch(err => utils.defaultError(res, err));
            } else {

                const token = await accessTokenDao.generateToken(usrOne[0]._id, usrOne[0]._id);
                const accessTokenValue = await accessTokenDao.saveTokenAndGetAccessToken(token, usrOne[0]._id);
                const basedAccesstoken = await accessTokenDao.generateToken(accessTokenValue, usrOne[0]._id);

                console.log("usrOne[0] ", usrOne[0])
                res.redirect("msrm42app://msrm42app.io?token=" + basedAccesstoken +
                    "&userId=" + usrOne[0]._id + "&givenName=" +
                    usrOne[0].username);
            }
        })
        .catch(err => utils.defaultError(res, err))
}


async function deezerOauth2User(res, user) {
    if (user) {
        const accessTokenDeezer = user.accessToken;
        res.redirect("msrm42app://msrm42app.io?deezerToken=" + accessTokenDeezer);
    } else res.redirect("msrm42app://msrm42app.io?deezerToken=false");
}

module.exports = {
    loginOauth2User,
    loginOauth2UserVia42,
    deezerOauth2User
}