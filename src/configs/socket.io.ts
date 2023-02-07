const { app } = require('../../index')
const http = require('http').Server(app)
const socketIO = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000"
  }
});

const socketIoOn = () => {
  let users = [];
  return socketIO.on('connection', (socket: any) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

    //sends the message to all the users on the server
    socket.on('message', (data: any) => {
      console.log(data);
      socketIO.emit('messageResponse', data);
    });

    //Listens when a new user joins the server
    socket.on('newUser', (data: any) => {
      //Adds the new user to the list of users
      users.push(data);
      // console.log(users);
      //Sends the list of users to the client
      socketIO.emit('newUserResponse', users);
    });


    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
      //Updates the list of users when a user disconnects from the server
      users = users.filter((user: any) => user.socketID !== socket.id);
      // console.log(users);
      //Sends the list of users to the client
      socketIO.emit('newUserResponse', users);
      socket.disconnect();
    });
  });
}

module.exports = { socketIoOn }