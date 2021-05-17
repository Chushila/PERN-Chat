#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../../app');
var debug = require('debug')('messaging-app:server');
var http = require('http');
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

/**
 * Create HTTP server.
 */


var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

 const io = require('socket.io')(server)
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

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */


io.on('connection',socket=>{
   const id = socket.handshake.query.id;
   
   socket.join(id)

   socket.on('send-message',({recipients,conversation}) =>{
    recipients.forEach(recipient=>{
      socket.broadcast.to(recipient.contact_user_id).emit('receive-message',{
       conversation:conversation
      })
    })
   })
   socket.on('make-conversation',({recipients,conversationObj,name}) =>{
    recipients.forEach(recipient=>{
      socket.broadcast.to(recipient.contact_user_id).emit('new-conversation',{conversationObj,name})
    })
   })
})


function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
