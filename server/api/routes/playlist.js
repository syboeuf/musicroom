var express = require('express');
const router = express.Router();
const playListController = require('../controllers/playListController');

const checkAuth = require("../middleware/check-auth");


/**
 * @swagger
 * tags:
 *   name: Playlist
 *   description: Playlist management -> Need Auth
 */


/**
 * @swagger
 * /api/v1/playlist/id/:id:
 *    get:
 *      description:  get playlist by id
 *      tags: [Playlist]
 *    responses:
 *      '200':
 *        description: playlist data
 *        schema:
 *          type: string
 *          format: string
 */
router.get('/id/:id', checkAuth, playListController.getPlaylistById)

/**
* @swagger
* /api/v1/playlist/event/id/:id:
*    get:
*      description:  get event by id
*      tags: [Playlist]
*    responses:
*      '200':
*        description: event data
*        schema:
*          type: string
*          format: string
*/
router.get('/event/id/:id', checkAuth, playListController.getEventById)

/**
* @swagger
* /api/v1/playlist/getAllPublic:
*    get:
*      description:  get public playlist
*      tags: [Playlist]
*    responses:
*      '200':
*        description: playlist array data
*        schema:
*          type: string
*          format: string
*/
router.get('/getAllPublic', checkAuth, playListController.getAllPublicPlaylist)

/**
* @swagger
* /api/v1/playlist/getlist:
*    get:
*      description:  getlist of playlist
*      tags: [Playlist]
*    responses:
*      '200':
*        description: playlist list array data
*        schema:
*          type: string
*          format: string
*/
router.get('/getlist', checkAuth, playListController.getListPlaylist);

/**
* @swagger
* /api/v1/playlist/mine:
*    get:
*      description:  get my playlist
*      tags: [Playlist]
*    responses:
*      '200':
*        description: playlist list array data
*        schema:
*          type: string
*          format: string
*/
router.get('/mine', checkAuth, playListController.getMine)


/**
* @swagger
* /api/v1/playlist/getevents:
*    get:
*      description:  get events
*      tags: [Playlist]
*    responses:
*      '200':
*        description: events list array data
*        schema:
*          type: string
*          format: string
*/
router.get('/getevents', checkAuth, playListController.getAllEvents);


/**
 * @swagger
 * /api/v1/playlist/new:
 *    post:
 *      description:  create new playlist
 *      tags: [Playlist]
 *    parameters:
 *      - Playlistdata: all data of playlist
 *        in: query
 *        description: id of playlist
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully created playlist
 *        schema:
 *          type: string
 *          format: string
 */
router.post('/new', checkAuth, playListController.createPlaylist)

/**
 * @swagger
 * /api/v1/playlist/update:
 *    post:
 *      description:  update playlist
 *      tags: [Playlist]
 *    parameters:
 *      - Playlistdata: all data of playlist
 *        in: query
 *        description: id of playlist
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully updated playlist
 *        schema:
 *          type: string
 *          format: string
 */
router.post('/update', checkAuth, playListController.updatePlaylistInfo)

/**
 * @swagger
 * /api/v1/playlist/delete:
 *    post:
 *      description:  delete playlist
 *      tags: [Playlist]
 *    parameters:
 *      - playlistId: id of playlist
 *        in: query
 *        description: id of playlist
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully delted playlist
 *        schema:
 *          type: string
 *          format: string
 */
router.post('/delete', checkAuth, playListController.deletePlaylist)


/**
 * @swagger
 * /api/v1/playlist/likes:
 *    post:
 *      description:  like playlist
 *      tags: [Playlist]
 *    parameters:
 *      - playlistId: id of playlist
 *        in: query
 *        description: id of playlist
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully liked playlist
 *        schema:
 *          type: string
 *          format: string
 */
router.post('/likes', checkAuth, playListController.likePlaylist)

/**
 * @swagger
 * /api/v1/playlist/event/likes:
 *    post:
 *      description:  like event
 *      tags: [Playlist]
 *    parameters:
 *      - eventId: id of event
 *        in: query
 *        description: id of event
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully liked event
 *        schema:
 *          type: string
 *          format: string
 */
router.post('/event/likes', checkAuth, playListController.likeEvent)

/**
 * @swagger
 * /api/v1/playlist/position:
 *    post:
 *      description:  update playlist for music position
 *      tags: [Playlist]
 *    parameters:
 *      - Playlistdata: all data of playlist
 *        in: query
 *        description: id of playlist
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully updated playlist
 *        schema:
 *          type: string
 *          format: string
 */
router.post('/position', checkAuth, playListController.positionPlaylist)

/**
 * @swagger
 * /api/v1/playlist/event/position:
 *    post:
 *      description:  update event for music position
 *      tags: [Playlist]
 *    parameters:
 *      - Eventdata: all data of event
 *        in: query
 *        description: id of event
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully updated event
 *        schema:
 *          type: string
 *          format: string
 */
router.post('/event/position', checkAuth, playListController.positionEvent)

/**
 * @swagger
 * /api/v1/playlist/event/new:
 *    post:
 *      description:  create new event
 *      tags: [Playlist]
 *    parameters:
 *      - Eventdata: all data of event
 *        in: query
 *        description: id of event
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully created event
 *        schema:
 *          type: string
 *          format: string
 */
router.post('/event/new', checkAuth, playListController.newEvent)



module.exports = router;