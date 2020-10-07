const bookmarkDao = require('../../daos/bookmarkDao/bookmarkDao')

const deleteBookmark = (req, res, user, playlistId) => {
    if (!playlistId) {
        res.status(200).json({
            success: false,
            data: {
                msg: 'Eror on data'
            },
            code: 406
        })
    } else
        bookmarkDao.testBookmark(user.id, playlistId)
            .then(haveBookmark => {
                if (haveBookmark) {
                    bookmarkDao.deleteBookmark(user.id, playlistId).then(bookmark => {
                        req.app.io.emit('deleteBookmark', bookmark)
                        res.status(200).json({
                            success: true,
                            data: {
                                bookmark: bookmark
                            },
                            code: 200
                        })
                    })
                } else {
                    res.status(200).json({
                        success: false,
                        data: {
                            msg: 'Error you dont have bookmark'
                        },
                        code: 406
                    })
                }
            })
}

module.exports = {
    deleteBookmark
}