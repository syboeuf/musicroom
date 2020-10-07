const createBookmark = require('./createBookmark')
const deleteBookmark = require('./deleteBookmark')
const getBookmark = require('./getBookmark')
const getBookmarkByplIdService = require("./getBookmarkByplIdService");

module.exports = {
    createBookmark,
    getBookmarkByplIdService,
    deleteBookmark,
    getBookmark
}