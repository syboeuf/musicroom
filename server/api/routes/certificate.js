var express = require('express');
const router = express.Router();

const certificateController = require('../controllers/certificateController');

const checkAuth = require("../middleware/check-auth");


/**
 * @swagger
 * tags:
 *   name: Certificate
 *   description: User certificate management -> Need Auth
 */


/**
 * @swagger
 * /api/v1/certificate/new:
 *    post:
 *      description:  create bookmark
 *      tags: [Certificate]
 *    parameters:
 *      - userId: id of user
 *        in: query
 *        description: id of user
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *      - playlistd: id of playlist
 *        in: query
 *        description: id of playlist
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully created certificate
 *        schema:
 *          type: string
 *          format: string
 */
router.post('/new', checkAuth, certificateController.newCertificate)


/**
 * @swagger
 * /api/v1/certificate/delete:
 *    post:
 *      description:  delete certificate
 *      tags: [Certificate]
 *    parameters:
 *      - userid: userid
 *        in: query
 *        description: id of user
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully del certificate
 *        schema:
 *          type: string
 *          format: string
 */
router.post('/delete', checkAuth, certificateController.deleteCertificate)


/**
 * @swagger
 * /api/v1/certificate/myCertificate:
 *    get:
 *      description:  get my certificate
 *      tags: [Certificate]
 *    responses:
 *      '200':
 *        description: cartificate list
 *        schema:
 *          type: string
 *          format: string
 */
router.get('/myCertificate', checkAuth, certificateController.myCertificate)


module.exports = router;