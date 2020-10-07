const Bookmark = require('../../models/bookmark');
const BookmarkClass = require("../../class/bookmarkClass");

const newBookmark = (userId, playListId) => {
    return new Promise(async (resolve, reject) => {
        // TODO CHECK IF BOOKMARK EXIST
        let bookmark = new Bookmark(await BookmarkClass.CreateNewBookmark(userId, playListId));
        bookmark.save().then(res => {
            console.log("res :, ", res)
            resolve(bookmark);
        }).catch(err => {
            console.log("newBookmark ERR :", err);
            reject(err);
        })
    })
}

const testBookmark = (userId, playListId) => {
    return new Promise(async (resolve, reject) => {
        Bookmark.findOne({ userId: userId, playlistId: playListId }).exec()
            .then(res => {
                if (res)
                    resolve(true);
                else
                    resolve(false)
            }).catch(err => {
                console.log("testBookmark ERR :", err);
                reject(err);
            })
    })
}

const deleteBookmark = (userId, playListId) => {
    return new Promise(async (resolve, reject) => {
        Bookmark.findOneAndDelete({ userId: userId, playlistId: playListId }).exec()
            .then(res => {
                if (res)
                    resolve(res);
                else
                    resolve(false)
            }).catch(err => {
                console.log("deleteBookmark ERR :", err);
                reject(err);
            })
    })
}

const getMyBookmark = (id) => {
    return new Promise(async (resolve, reject) => {
        Bookmark.find({ userId: id }).exec()
            .then(res => {
                resolve(res);
            }).catch(err => {
                console.log("getMyBookmark ERR :", err);
                reject(err);
            })
    })
}

const getMyBookmarkByPlayListId = (id) => {
    return new Promise(async (resolve, reject) => {
        Bookmark.find({ playlistId: id }).exec()
            .then(res => {
                resolve(res);
            }).catch(err => {
                console.log("getMyBookmark ERR :", err);
                reject(err);
            })
    })
}


module.exports = {
    getMyBookmark,
    newBookmark,
    getMyBookmarkByPlayListId,
    testBookmark,
    deleteBookmark
}