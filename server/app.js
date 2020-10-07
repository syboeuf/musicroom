require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./config/dbConnection');
var bodyParser = require('body-parser');
const rateLimiter = require('express-rate-limit-middleware').rateLimit
const helmet = require('helmet');
let mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc')
var cron = require('node-cron');
const passport = require('passport');
const eventDao = require('./api/daos/eventDao/eventDao')


// Main app
var app = express();



/// Init auto swagger 
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Music Room API",
      description: "Music Room API Information",
      contact: {
        name: "Music Room Team !"
      },
      servers: ["http://localhost:3000"]
    }
  },
  // ['.routes/*.js']
  apis: ['./api/routes/*.js', './api/models/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Initialize passprt
app.use(passport.initialize());

// Logs
app.use(logger('dev'));

// important if behind a proxy to ensure client IP is passed to req.ip
//app.enable('trust proxy'); 


//Map global promise
mongoose.Promise = global.Promise;


// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Limit request per ip address
//app.use(rateLimiter({
//  limit: 1000, 
//  reset: '1 hour'
//}))

// Remove at start ans evry minuts
eventDao.delAllOutdatedEvents()
cron.schedule('* * * * *', () => {
  eventDao.delAllOutdatedEvents()
});


// Fix CORS errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
    return res.status(200).json({});
  };
  next();
});

// Routes
var indexRouter = require('./api/routes/index');
var userRouter = require('./api/routes/user');
var playListRouter = require('./api/routes/playlist');
var certificateRouter = require('./api/routes/certificate');
var bookmarkRouter = require('./api/routes/bookmark');

// Open connection to the database
db.once('open', function () {
  console.log('Connected to mongodb!');
});

// Catch errors on database connection failure
db.on('error', function (err) {
  console.log('Error while connecting to database: ', err)
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Call routes API
app.use('/', indexRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/playList', playListRouter);
app.use('/api/v1/certificate', certificateRouter);
app.use('/api/v1/bookmark', bookmarkRouter);

//Use hamlet 
app.use(helmet())

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
