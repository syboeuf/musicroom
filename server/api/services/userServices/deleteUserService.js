const userDao = require('../../daos/userDao/userDao');

const deleteUser = (res, id) => {
    userDao.deleteUserById(id).then(data => {
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
                msg: "Error Unknow " + err
            },
            code: 444
        })
    })
}


module.exports = {
    deleteUser
}