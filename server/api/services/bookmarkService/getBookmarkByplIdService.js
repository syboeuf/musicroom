const bookmarkDao = require('../../daos/bookmarkDao/bookmarkDao')

async function getBookmarkByplId(playListId, res) {
    bookmarkDao.getMyBookmarkByPlayListId(playListId)
        .then(bookmark => {
            console.log("bookmark :", bookmark);
            if (bookmark.length > 0) {
                res.status(200).json({
                    success: true,
                    data: {
                        bookmark
                    },
                    code: 200
                })
            } else {
                res.status(200).json({
                    success: true,
                    code: 406
                })
            }
        })
}
module.exports = {
    getBookmarkByplId,
}