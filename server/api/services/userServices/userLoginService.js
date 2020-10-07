const User = require('../../models/User');
const utils = require('../../utils/utils');
const AccessToken = require('../../class/accessTokenClass');
const verifyPwd = require('../../utils/passwordMatchVerification');

async function userLogin(userInfo, res) {
    const accessTokenDao = new AccessToken();

    User.find({
        email: userInfo.email,
        active: true,
    })
        .exec()
        .then(async userData => {
            console.log("userData :", userData);
            if (userData.length === 0) {
                res.status(200).json({
                    success: true,
                    code: 406,
                    data: {
                        msg: "Account does not exists"
                    }
                })
            } else if (await verifyPwd.passwordMatchVerification(userInfo.password, userData[0].password)) {
                const token = await accessTokenDao.generateToken(userData[0]._id, userData[0].email);
                const accessTokenValue = await accessTokenDao.saveTokenAndGetAccessToken(token, userData[0]._id);
                const basedAccesstoken = await accessTokenDao.generateToken(accessTokenValue, userData[0]._id);
                res.status(200).json({
                    success: true,
                    code: 200,
                    data: {
                        token: basedAccesstoken,
                        userId: userData[0]._id,
                        username: userData[0].username,
                        email: userData[0].email,
                        dateOfCreation: userData[0].dateOfCreation
                    }
                })
            } else {
                res.status(200).json({
                    success: true,
                    code: 407,
                    data: {
                        msg: "Password and/or email is not correct"
                    }
                })

            }


        })
        .catch(err => utils.defaultError(res, err))
}

module.exports = {
    userLogin
}