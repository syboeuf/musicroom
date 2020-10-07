var express = require('express');
var router = express.Router();
var passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../../config/googleOath2');
const oauth2Controller = require('../../api/controllers/oauth2Controller');
var FortyTwoStrategy = require('passport-42').Strategy;
var DeezerStrategy = require('passport-deezer').Strategy;

const userDao = require('../daos/userDao/userDao')


/**
 * Jwt Passport for secure routes
 * ex : Authorization : bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQ2xpZW50IiwiX2lkIjoiNWUzN2NkMGI4YTAxNjEwNWNhMmFjZjYwIiwiZW1haWwiOiJwcmFqYWt0YUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRzWXN4MGcyWGsybWdSTHNaZXBEYkV1MklRcGhVOURkNnczeTBHaUxMWHJVeW5aazlUR0xKSyIsIl9fdiI6MCwiaWF0IjoxNTgwNzE5ODE3LCJleHAiOjE1ODA3Mjk4OTd9.38x2wztqJWz9EH8_lN0ca-L-8mTQvW36iF2bfGk_ydg
 */
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;
passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {

  userDao.getUserById(jwtPayload.user_id)
    .then(data => {
      if (data)
        return done(null, data)
      else
        return done(null, false);
    })
    .catch((err) => { return done(null, false); });

})
);
// End of :  Jwt Passport for secure routes

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(new GoogleStrategy({
  clientID: "393906309113-lf7gnp6pkk65bjeelg0rh90rqulqb574.apps.googleusercontent.com",
  clientSecret: "QT3XCRQLbRADLQbFuZPD0NL6",
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
}))


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * @swagger
 * tags:
 *   name: Oauth2
 *   description: User Oauth2 system, for login or sigin and get token 
 */

/**
* @swagger
* /auth/google:
*    get:
*      description:  auth google
*      tags: [Oauth2]
*    responses:
*      '200':
*        description: Successfully Oauth2
*        schema:
*          type: string
*          format: string
*/
// Googe Oauth2
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

/**
* @swagger
* /auth/google/callback:
*    get:
*      description:  auth google callback
*      tags: [Oauth2]
*    responses:
*      '200':
*        description: Successfully Oauth2
*        schema:
*          type: string
*          format: string
*/
// Google Oauth2 callback url
router.get('/auth/google/callback', passport.authenticate('google'), oauth2Controller.googleOauth2);


// Deezer
passport.use(new DeezerStrategy({
  clientID: "427042",
  clientSecret: "161704cadd55a360d2db9644e688db05",
  callbackURL: "http://ec2-3-15-228-137.us-east-2.compute.amazonaws.com/auth/deezer/callback"
}, (accessToken, refreshToken, profile, done) => {
  done(null, { profile, accessToken });
}
));

/**
* @swagger
* /auth/deezer:
*    get:
*      description:  auth deezer 
*      tags: [Oauth2]
*    responses:
*      '200':
*        description: Successfully Oauth2
*        schema:
*          type: string
*          format: string
*/
router.get('/auth/deezer',
  passport.authenticate('deezer'));

/**
* @swagger
* /auth/deezer/callback:
*    get:
*      description:  auth deezer callback
*      tags: [Oauth2]
*    responses:
*      '200':
*        description: Successfully Oauth2
*        schema:
*          type: string
*          format: string
*/
router.get('/auth/deezer/callback',
  passport.authenticate('deezer', { failureRedirect: '/login' }),
  oauth2Controller.deezerOauth2
);


// 42
passport.use(new FortyTwoStrategy({
  clientID: `f70297f82626c75530095926c74be94b13125f221dfaeb84939af7eb5e577aa2`,
  clientSecret: `283224cfe2096e88b44006727c3a2797cc187b73fe3467df07833448eef9d9f2`,
  callbackURL: 'http://ec2-3-15-228-137.us-east-2.compute.amazonaws.com/auth/42/callback'
},
  function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }));


/**
* @swagger
* /login/42:
*    get:
*      description:  auth 42 
*      tags: [Oauth2]
*    responses:
*      '200':
*        description: Successfully Oauth2
*        schema:
*          type: string
*          format: string
*/
router.get('/login/42',
  passport.authenticate('42'));


/**
* @swagger
* /login/42/callback:
*    get:
*      description:  auth 42 callback
*      tags: [Oauth2]
*    responses:
*      '200':
*        description: Successfully Oauth2
*        schema:
*          type: string
*          format: string
*/
router.get('/auth/42/callback',
  passport.authenticate('42', { failureRedirect: '/login' }),
  oauth2Controller.Oauth2Via42);


module.exports = router;
