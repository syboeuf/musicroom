const userDao = require('../../daos/userDao/userDao');
const utils = require('../../utils/utils');

async function getContributorInfo(id, data, res) {
    let response = await userDao.ifContributorExist(data.contributor);
 
    if (response.length > 0) {
        res.status(200).json({
            success: true,
            data: {
                contributorId: response[0]._id,
                msg: "Contributor exists"
            },
            code: 200
        })
    } else {
        res.status(200).json({
            success: false,
            data: {
                msg: "Contributor does not exists"
            },
            code: 404
        })
    }
}


module.exports = {
    getContributorInfo
}