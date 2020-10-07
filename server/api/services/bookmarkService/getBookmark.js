const bookmarkDao = require('../../daos/bookmarkDao/bookmarkDao')
const bookmark = require('../../models/bookmark')

const getMyBookmark = (user, res) => {
    bookmarkDao.getMyBookmark(user.id)
        .then(bookmark => {
            res.status(200).json({
                success: true,
                data: {
                    bookmarkArray: bookmark
                },
                code: 200
            })

        })
}

module.exports = {
    getMyBookmark
}