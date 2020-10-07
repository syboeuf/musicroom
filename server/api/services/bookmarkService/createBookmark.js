const bookmarkDao = require('../../daos/bookmarkDao/bookmarkDao')

const createBookmark = (req, res, user, playlistId) => {
    if (!playlistId) {
        res.status(200).json({
            success: false,
            data: {
                msg: 'Eror on data'
            },
            code: 406
        })
    } else
        bookmarkDao.newBookmark(user.id, playlistId).then(bookmark => {
            req.app.io.emit('newBookmark', bookmark)
            res.status(200).json({
                success: true,
                data: {
                    bookmark: bookmark
                },
                code: 200
            })

        })
}

module.exports = {
    createBookmark
}