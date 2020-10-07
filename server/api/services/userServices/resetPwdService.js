const userDao = require('../../daos/userDao/userDao');
const utils = require('../../utils/utils')

async function resetPwd(email, res) {
    if (utils.mailRegex.test(email) === false) {
        res.status(200).json({
            success: false,
            data: {
                msg: "Regex error"
            },
            code: 407
        })
    } else if (await userDao.ifExistUserAccount(email) > 0) {
        if (await userDao.resetPassword(email)) {
            res.status(200).json({
                success: true,
                data: {
                    msg: "Password modified with success, check your email."
                },
                code: 200
            })
        } else {
            res.status(200).json({
                success: true,
                data: {
                    msg: "This account is not active or does not exist !"
                },
                code: 500
            })
        }
    } else {
        res.status(200).json({
            success: true,
            data: {
                valid: false,
                msg: "This account does not exists"
            },
            code: 406
        })
    }
}

module.exports = {
    resetPwd
}