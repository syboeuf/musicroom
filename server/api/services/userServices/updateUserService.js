const userDao = require('../../daos/userDao/userDao');
const utils = require('../../utils/utils');

const updateUserData = (id, updateUser, res) => {
    userDao.updateUserData(id, updateUser).then(data => {
        if (data) {
            res.status(200).json({
                success: true,
                data: {
                    user: data
                },
                code: 200
            })
        } else {
            res.status(200).json({
                success: false,
                data: {
                    msg: "User not found"
                },
                code: 202
            })
        }
    }).catch(err => {
        res.status(200).json({
            success: false,
            data: {
                msg: "Error Unknow updateUser " + err
            },
            code: 444
        })
    })
}

const updateUserPassword = (id, updateUser, res) => {
    userDao.updateUserPassword(id, updateUser).then(data => {
        if (data) {
            res.status(200).json({
                success: true,
                data: {
                    user: data
                },
                code: 200
            })
        } else {
            res.status(200).json({
                success: false,
                data: {
                    msg: "User not found"
                },
                code: 202
            })
        }
    }).catch(err => {
        res.status(200).json({
            success: false,
            data: {
                msg: "Error Unknow updateUser " + err
            },
            code: 444
        })
    })
}

const updateUserEmail = async (id, updateUser, res) => {
    if (!updateUser || !updateUser.email || utils.mailRegex.test(updateUser.email) === false) {
        res.status(200).json({
            success: false,
            data: {
                msg: "Regex error mail"
            },
            code: 408
        })
    } else {
        // check if email exist
        if (await userDao.ifExistUserAccount(updateUser.email) === 0) {
            if (await userDao.changeEmailForUser(id, updateUser.email)) {
                res.status(200).json({
                    success: true,
                    data: {
                        msg: "Email saved with success. Check your email inbox to validate your email address! "
                    },
                    code: 200
                })
            } else {
                res.status(500);
            }
        } else {
            res.status(200).json({
                success: true,
                data: {
                    valid: false,
                    msg: "This account email already exists"
                },
                code: 406
            })
        }
    }
}


module.exports = {
    updateUserData,
    updateUserPassword,
    updateUserEmail
}