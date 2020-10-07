const userDao = require('../../daos/userDao/userDao');
const jwt = require('jsonwebtoken');

async function validateEmailAddress(res, token) {
    if (await userDao.accountValidation(token) > 0) {
        res.send("Account validated succesfully, you may login to your account.")
    } else {
        res.send("This link is not valid, this incident will be repported.");
    }
}

async function validateNewEmailAddress(res, token) {
    try {
        var tokendata = jwt.verify(token, process.env.JWT_KEY);
        if (await userDao.ifExistUserAccount(tokendata.email) === 0) {
            if (await userDao.accountEmailValidation(tokendata) > 0) {
                res.send("Email swap succesfully, you may login to your account.")
            } else {
                res.send("This link is not valid, this incident will be repported.");
            }
        } else {
            res.status(200).json({
                success: false,
                data: {
                    valid: false,
                    msg: "This account email already exists"
                },
                code: 406
            })
        }
    } catch (err) {
        res.status(200).json({
            success: false,
            data: {
                valid: false,
                msg: "Error on Token"
            },
            code: 406
        })
    }
}



module.exports = {
    validateEmailAddress,
    validateNewEmailAddress
}