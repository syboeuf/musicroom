const User = require('../../models/User');
const UserClass = require("../../class/UserClass");
const utils = require('../../utils/utils');
const userEmailsTemplate = require('../../emails/userEmails/accountValidationEmail');
const emailSender = require('../../utils/emailSender');
const uniqId = require('uniqid')
const AccessToken = require('../../class/accessTokenClass');


ifExistUserAccount = (email) => {
    return new Promise((resolve, reject) => {
        User.find({
            email: email
        }).exec()
            .then(response => {
                resolve(response.length);
            }).catch(err => console.log("existEmailToBeValidated ERR :", err));
    })
}

ifExistUserAccountById = (id) => {
    return new Promise((resolve, reject) => {
        User.find({
            _id: id
        }).exec()
            .then(response => {
                resolve(response.length);
            }).catch(err => console.log("ifExistUserAccountById ERR :", err));
    })
}


saveNewUserAccount = (data) => {
    return new Promise(async (resolve, reject) => {
        const accessTokenDao = new AccessToken();
        const token = await accessTokenDao.generateToken(data.email, data.username);
        let user = new User(await UserClass.CreateNewUser(data, token));
        user.save().then(res => {
            let msg = userEmailsTemplate.accountValidation(token);
            emailSender.sendEmail("MUSICROOM TEAM", data.email, "Account validation", msg);
            resolve(true);
        }).catch(err => {
            console.log("saveNewUserAccount ERR :", err);
            resolve(false);
        })
    })
}

changeEmailForUser = (id, email) => {
    return new Promise(async (resolve, reject) => {
        User.findById(id).exec()
            .then(async user => {

                const accessTokenDao = new AccessToken();
                const token = await accessTokenDao.generateToken(id, email);
                user.emailSwap = email
                user.save().then(res => {
                    let msg = userEmailsTemplate.newEmailValidation(token);
                    emailSender.sendEmail("MUSICROOM TEAM", email, "Account validation", msg);
                    resolve(true);
                }).catch(err => {
                    console.log("saveNewUserAccount ERR :", err);
                    resolve(false);
                })

            }).catch(err => {
                console.log("getUserById ERR :", err)
                resolve(false);
            });
    })
}

accountValidation = (token) => {
    return new Promise((resolve, reject) => {
        User.find({
            validationToken: token,
            active: false
        }).exec()
            .then(response => {
                if (response.length > 0) {
                    response[0].active = true;
                    User.findByIdAndUpdate(
                        response[0]._id,
                        response[0],
                        { new: true },
                        (err, updatedUser) => {
                            if (err) resolve(0);
                            console.log("updatedUser :", updatedUser);
                            resolve(response.length);
                        }
                    )
                } else
                    resolve(response.length);
            }).catch(err => {
                resolve(0)
                console.log("accountValidation ERR :", err)
            });
    })
}

accountEmailValidation = (token) => {
    return new Promise((resolve, reject) => {
        User.findById(token.id).exec()
            .then(async user => {
                if (user && user.emailSwap === token.data) {
                    user.emailSwap = ''
                    user.email = token.data
                    User.findByIdAndUpdate(
                        token.id,
                        user,
                        { new: true },
                        (err, updatedUser) => {
                            if (err) resolve(0);
                            console.log("updatedUser :", updatedUser);
                            resolve(1);
                        }
                    )
                } else
                    resolve(0);
            }).catch(err => {
                resolve(0)
                console.log("accountValidation ERR :", err)
            });
    })
}

getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        User.find({
            email: email,
            active: true
        }).exec()
            .then(response => {
                resolve(response);
            }).catch(err => console.log("getUserByEmail ERR :", err));
    })
}

resetPassword = async (email) => {
    return new Promise(async (resolve, reject) => {
        //    Generate new pwd
        try {
            const newPwd = await utils.generateRandomPassword();
            // Hash new pawd
            const hashedPwd = await utils.hashPassword(newPwd);
            // Get user
            let user = await getUserByEmail(email);
            user[0].password = hashedPwd;

            // update the new password
            User.findByIdAndUpdate(
                user[0]._id,
                user[0],
                { new: true },
                (err, user) => {
                    if (err) resolve(false);
                    console.log("User :", user);
                    let msg = userEmailsTemplate.resetPassword(newPwd);
                    emailSender.sendEmail("MUSICROOM TEAM", email, "Reset password", msg);
                    resolve(true);
                }
            )
        } catch (err) {
            resolve(false)
        }
    })
}

getUserById = (id) => {
    return new Promise((resolve, reject) => {
        User.findById(id).exec()
            .then(response => {
                resolve(response);
            }).catch(err => {
                console.log("getUserById ERR :", err)
                reject(err)
            });
    })
}

deleteUserById = (id) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndDelete(id).exec()
            .then(response => {
                resolve(response);
            }).catch(err => {
                console.log("deleteUserById ERR :", err)
                reject(err)
            });
    })
}

updateUserData = (id, updateUser) => {
    return new Promise((resolve, reject) => {
        User.findById(id).exec()
            .then(user => {
                if (!user)
                    resolve(false)
                else {
                    if (updateUser.status)
                        user.status = updateUser.status
                    if (updateUser.city)
                        user.city = updateUser.city
                    if (updateUser.age)
                        user.age = updateUser.age
                    if (updateUser.musicStyle)
                        user.musicStyle = updateUser.musicStyle
                    if (updateUser.firstname)
                        user.firstname = updateUser.firstname
                    if (updateUser.lastname)
                        user.lastname = updateUser.lastname

                    User.findByIdAndUpdate(id,
                        user, { new: true }, (err, userRes) => {
                            if (err) resolve(false);
                            resolve(userRes);
                        })
                }
            }).catch(err => {
                reject(err)
            });
    })
}


updateUserPassword = async (id, updateUser) => {
    return new Promise((resolve, reject) => {
        User.findById(id).exec()
            .then(async user => {
                if (!user)
                    resolve(false)
                else {
                    if (updateUser.password && utils.passwordRegex.test(updateUser.password)) {
                        const hashedPwd = await utils.hashPassword(updateUser.password);
                        user.password = hashedPwd
                    }
                    User.findByIdAndUpdate(id,
                        user, { new: true }, (err, userRes) => {
                            if (err) resolve(false);
                            resolve(userRes);
                        })
                }
            }).catch(err => {
                reject(err)
            });
    })
}

ifContributorExist = (id) => {
    return new Promise((resolve, reject) => {
        User.find(
            {
                $or: [{
                    email: id
                }, {
                    username: id
                }]
            }
        ).exec()
            .then(data => {
                if (data.length > 0)
                    resolve(data);
                else
                    resolve(false);
            }).catch(err => {
                reject(err)
            });
    })
}

module.exports = {
    getUserByEmail,
    ifExistUserAccount,
    ifContributorExist,
    accountValidation,
    changeEmailForUser,
    accountEmailValidation,
    resetPassword,
    ifExistUserAccountById,
    getUserById,
    updateUserData,
    updateUserPassword,
    deleteUserById,
    saveNewUserAccount
}