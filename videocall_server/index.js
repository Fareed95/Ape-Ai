const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://templetrepo.vercel.app',"https://megahackathon.vercel.app"],
  methods: ['GET', 'POST'],
  credentials: true,
};

app.use(cors(corsOptions)); // CORS middleware

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://templetrepo.vercel.app',"https://megahackathon.vercel.app"],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const rooms = {}; // Track users in rooms
const allowedRooms = {
  'videocall/a': ['room1', 'room2'],
  'videocall/b': ['room3', 'room4']
};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', ({ room, user }) => {
    if (!room || !user || !user.name) {
      console.error('Invalid room or user data received.');
      return;
    }

    const userRoomType = user.name.split('/')[0]; // Assuming user name includes room type, e.g., "videocall/a/John"
    if (!allowedRooms[userRoomType] || !allowedRooms[userRoomType].includes(room)) {
      console.log(`User ${user.name} is not allowed to join room ${room}.`);
      socket.emit('joinError', 'You are not allowed to join this room.');
      return;
    }

    socket.join(room);

    // Add user to room list
    if (!rooms[room]) rooms[room] = [];
    rooms[room].push({ id: socket.id, name: user.name });

    console.log(`User ${user.name} joined room: ${room}`);

    // Notify other participants about the new user
    socket.to(room).emit('userJoined', { name: user.name });

    // Send the updated list of users in the room to the joining user
    const otherUsers = rooms[room].filter((userInRoom) => userInRoom.id !== socket.id);
    socket.emit('roomUsers', { users: otherUsers });
  });

  socket.on('offer', ({ offer, room, user }) => {
    if (!room || !user || !user.name) {
      console.error('Invalid room or user data received.');
      return;
    }

    console.log(`Offer received in room ${room}`);
    socket.to(room).emit('offer', offer);
  });

  socket.on('answer', ({ answer, room, user }) => {
    if (!room || !user || !user.name) {
      console.error('Invalid room or user data received.');
      return;
    }

    console.log(`Answer received in room ${room}`);
    socket.to(room).emit('answer', answer);
  });

  socket.on('ice-candidate', ({ candidate, room, user }) => {
    if (!room || !user || !user.name) {
      console.error('Invalid room or user data received.');
      return;
    }

    console.log(`ICE Candidate received in room ${room}`);
    socket.to(room).emit('ice-candidate', candidate);
  });

  socket.on('endCall', ({ room, user }) => {
    if (!room || !user || !user.name) {
      console.error('Invalid room or user data received.');
      return;
    }

    console.log(`Call ended in room: ${room}`);
    socket.to(room).emit('callEnded');
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');

    // Remove user from room list
    for (const room in rooms) {
      rooms[room] = rooms[room].filter((user) => user.id !== socket.id);
      socket.to(room).emit('userLeft');
    }
  });
});

server.listen(7500, () => {
  console.log('Server listening on port 7500');
});
