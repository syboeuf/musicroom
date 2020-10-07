const bcrypt = require('bcrypt');

userNameRegex = RegExp(/^[a-zA-Z0-9]*$/);
mailRegex = RegExp(/^[a-zA-Z0-9_\-\.]*\@[a-zA-Z0-9_\-\.]*\.[a-zA-Z]+$/);
passwordRegex = RegExp(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/);

hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            resolve(hash);
        })
    })
}

generateRandomPassword = () => {
    return new Promise((resolve, reject) => {
        let chars = "?<>@#%$&0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ?<>@#%$&abcdefghijklmnopqrstuvwxyz?<>@#%$&";
        let string_length = 20;
        let randomstring = '';
        for (let i = 0; i < string_length; i++) {
            let rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        resolve(randomstring);
    })
}

generateRandomNum = (size) => {
    return Math.floor((Math.random() * 99999) + 10000);
}

defaultError = (res, err) => {
    return res.status(500).json({
        error: err
    })
}

module.exports = {
    userNameRegex,
    mailRegex,
    passwordRegex,
    defaultError,
    generateRandomPassword,
    hashPassword,
    generateRandomNum
}