var express = require('express');
const router = express.Router();

const bookmarkController = require('../controllers/bookmarkController');

const checkAuth = require("../middleware/check-auth");

/**
 * @swagger
 * tags:
 *   name: Bookmark
 *   description: User bookmark management -> Need Auth
 */


/**
 * @swagger
 * /api/v1/bookmark/new:
 *    post:
 *      description:  create bookmark
 *      tags: [Bookmark]
 *    parameters:
*      - name: playlistId
 *        in: query
 *        description: id of playlist
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully created bookmark
 *        schema:
 *          type: string
 *          format: string
 */
router.post('/new', checkAuth, bookmarkController.newbookmark)

/**
* @swagger
* /api/v1/bookmark/delete:
*    post:
*      description:  delete bookmark
*      tags: [Bookmark]
*    parameters:
*      - name: playlistId
*        in: query
*        description: id of playlist
*        required: false
*        schema:
*          type: string
*          format: string
*    responses:
*      '200':
*        description: Successfully delete bookmark
*        schema:
*          type: string
*          format: string
*/
router.post('/delete', checkAuth, bookmarkController.deletebookmark)

/**
* @swagger
* /api/v1/bookmark/mybookmark:
*    get:
*      description:  get my bookmark
*      tags: [Bookmark]
*    responses:
*      '200':
*        description: my bookmark array
*        schema:
*          type: string
*          format: string
*/
router.get('/mybookmark', checkAuth, bookmarkController.mybookmark)


/**
* @swagger
* /api/v1/bookmark/mybookmarkbyplaylist:
*    get:
*      description:  get my bookmark by playlist id
*      tags: [Bookmark]
*    parameters:
*      - name: playlistId
*        in: query
*        description: id of playlist
*        required: false
*        schema:
*          type: string
*          format: string
*    responses:
*      '200':
*        description: my bookmark array
*        schema:
*          type: string
*          format: string
*/
router.post('/mybookmarkbyplaylist', checkAuth, bookmarkController.mybookmarkbyplaylist)


module.exports = router;