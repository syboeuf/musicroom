#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('backoffice:server');
var http = require('http');
const socket = require('socket.io')
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Add socket IO
 */

app.io = socket(server, {
  pingTimeout: 30000,
  cookie: false
});

let usersList = {};
app.io.on('connection', socket => {
  console.log(`new connection: ${socket.id}`);

  socket.on('join', (room) => {
    socket.join(room);
    console.log("new socket joined room :", room);
    if (usersList[room] === undefined)
      usersList[room] = new Array();
  });

  socket.on('newContributor', (data) => {
    usersList[data.room].push(data.user);

    let uniqMembers = [...new Set(usersList[data.room])];
    app.io.to(data.room).emit('newContributorJoined', uniqMembers);
  });

  socket.on('contributorLeft', (data) => {
    if (usersList[data.room]) {
      let dataList = usersList[data.room].filter((a, b) => a._id != data.id)
      usersList[data.room] = dataList;
      app.io.to(data.room).emit('newContributorJoined', usersList[data.room]);
    }
  })

  socket.on('addLikes', async (data) => {
    app.io.to(data.room).emit('newAddLikes', data.trackList);
  });

  socket.on('changePosition', async (data) => {
    app.io.to(data.room).emit('newChangePosition', data);
  });

  socket.on('disconnect', async (reason) => {
    console.log(`${socket.id} disconnected because: ${reason}`);
    socket.disconnect(true);
  });

});


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  debug('Listening on ' + bind);
}