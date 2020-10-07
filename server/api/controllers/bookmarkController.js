const bookmarkService = require('../services/bookmarkService/index');

const newbookmark = (req, res, next) => {
    let user = req.user
    let data = req.body
    bookmarkService.createBookmark.createBookmark(req, res, user, data)
}

const deletebookmark = (req, res, next) => {
    let user = req.user
    let data = req.body.playlistId
    bookmarkService.deleteBookmark.deleteBookmark(req, res, user, data)
}

const mybookmark = (req, res, next) => {
    let user = req.user
    bookmarkService.getBookmark.getMyBookmark(user, res)
}

const mybookmarkbyplaylist = (req, res, next) => {
    let data = req.body.playlistId
    bookmarkService.getBookmarkByplIdService.getBookmarkByplId(data, res)
}

module.exports = {
    newbookmark,
    mybookmarkbyplaylist,
    deletebookmark,
    mybookmark
}