var express = require('express');
const router = express.Router();
const multer = require('../middleware/FileUpload');
const userController = require('../controllers/userController');

const checkAuth = require("../middleware/check-auth");

//=> End of declared dependencies

// @desc    Signup new user
// @route   POST /api/v1/users/signup
// @access  Public
// router.post('/signup', multer.upload.any(), userController.createNewAccount)


/**
 * @swagger
 * tags:
 *   name: User
 *   description: user management
 */



/**
 * @swagger
 * /api/v1/users/signup:
 *    post:
 *      description: create user account 
 *      tags: [User]
 *    parameters:
 *      - userdata: all data of user
 *        in: query
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully create user
 *        schema:
 *          type: string
 *          format: string
 */
router.post('/signup', userController.createNewAccount)

/**
 * @swagger
 * /api/v1/users/signin:
 *    post:
 *      description: signin user account 
 *      tags: [User]
 *    parameters:
 *      - userdata: username and password
 *        in: query
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully signin user
 *        schema:
 *          type: string
 *          format: string
 */
router.post('/signin', userController.loginUser)

/**
 * @swagger
 * /api/v1/users/validation/:token:
 *    post:
 *      description: PUBLIC validate token
 *      tags: [User]
 *    parameters:
 *      - token: token
 *        in: query
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully validate user
 *        schema:
 *          type: string
 *          format: string
 */
router.get('/validation/:token', userController.validateAccount)

/**
 * @swagger
 * /api/v1/users/resetpwd:
 *    post:
 *      description: PUBLIC reset password
 *      tags: [User]
 *    parameters:
 *      - usermail: mail of user
 *        in: query
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully resetpwd user
 *        schema:
 *          type: string
 *          format: string
 */
router.post('/resetpwd', userController.resetPassword)


/**
 * @swagger
 * /api/v1/users/delete:
 *    post:
 *      description: delete user account 
 *      tags: [User]
 *    parameters:
 *      - userdata: username and password
 *        in: query
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully delete user
 *        schema:
 *          type: string
 *          format: string
 */router.post('/delete', checkAuth, userController.deleteUserById)

/**
 * @swagger
 * /api/v1/users/update:
 *    post:
 *      description: update user account 
 *      tags: [User]
 *    parameters:
 *      - userdata: username and password
 *        in: query
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully update user
 *        schema:
 *          type: string
 *          format: string
*/
router.post('/update', checkAuth, userController.updateUser)


/**
 * @swagger
 * /api/v1/users/updatePassword:
 *    post:
 *      description: updatePassword user account 
 *      tags: [User]
 *    parameters:
 *      - userdata: username and password
 *        in: query
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully updatePassword user
 *        schema:
 *          type: string
 *          format: string
*/
router.post('/updatePassword', checkAuth, userController.updateUserPassword)

/**
 * @swagger
 * /api/v1/users/updateEmail:
 *    post:
 *      description: updateEmail user account 
 *      tags: [User]
 *    parameters:
 *      - userdata: username and password
 *        in: query
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully updateEmail user
 *        schema:
 *          type: string
 *          format: string
*/
router.post('/updateEmail', checkAuth, userController.updateUserEmail)

/**
 * @swagger
 * /api/v1/users/contributor:
 *    post:
 *      description: contributor user account 
 *      tags: [User]
 *    parameters:
 *      - userdata: username and password
 *        in: query
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully contributor user
 *        schema:
 *          type: string
 *          format: string
*/
router.post('/contributor', checkAuth, userController.getContributor)

/**
 * @swagger
 * /api/v1/users/newemailvalidation/:token:
 *    get:
 *      description:  PUBLIC validate user acount by token
 *      tags: [User]
 *    responses:
 *      '200':
 *        description: user account validate
 *        schema:
 *          type: string
 *          format: string
 */
router.get('/newemailvalidation/:token', userController.validateNewEmail)

/**
 * @swagger
 * /api/v1/users/id/:id:
 *    get:
 *      description:  get user by id
 *      tags: [User]
 *    responses:
 *      '200':
 *        description: user data
 *        schema:
 *          type: string
 *          format: string
 */
router.get('/id/:id', checkAuth, userController.getUserById)


module.exports = router;