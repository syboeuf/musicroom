
const accountValidation = (token) => {
    let msg = `Hello ! \n  \
    \n Here is your activation link : \
    \n  ${process.env.URL_BACKEND + ":" + process.env.URL_BACKEND_PORT + "/api/v1/users/validation/" + token} \
    \n MUSICROOM TEAM`

    return msg
}

const newEmailValidation = (token) => {
    let msg = `Hello ! \n  \
    \n Here is your activation link for the new email : \
    \n  ${process.env.URL_BACKEND + ":" + process.env.URL_BACKEND_PORT + "/api/v1/users/newemailvalidation/" + token} \
    \n MUSICROOM TEAM`

    return msg
}

const resetPassword = (pwd) => {
    let msg = `Hello ! \n  \
    \n Here is your new password : \
    \n  ${"Password : " + pwd} \
    \n MUSICROOM TEAM`

    return msg
}


module.exports = {
    resetPassword,
    newEmailValidation,
    accountValidation
}