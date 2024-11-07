// const express = require('express')
// const app = express()


// const cookieParser = require("cookie-parser");
// const userRouter = require('./routes/UserRouter')
// const chatRouter = require('./routes/chatRouter')
// const messageRouter = require('./routes/messagesRouter')
// const cors = require('cors')
// require('dotenv').config()

// // const middle = require('./middlewares/authorisation')

// //middlewares
// app.use(express.json())
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
// }));
// app.use(cookieParser())


// //routers
// app.use('/users', userRouter)
// app.use('/chats', chatRouter)
// app.use('/message', messageRouter)

// // app.get('/cookie', middle)


// app.listen(process.env.PORT || 4000, () => {
//     console.log('server started')
// })

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  }
});

// Import routers
const userRouter = require('./routes/UserRouter');
const chatRouter = require('./routes/chatRouter');
const messageRouter = require('./routes/messagesRouter');

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());

// Routers
app.use('/users', userRouter);
app.use('/chats', chatRouter);
app.use('/message', messageRouter);

// WebSocket logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinChat', (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat: ${chatId}`);
  });

  socket.on('sendMessage', (message) => {
    const { chatId } = message;
    io.to(chatId).emit('message', message);
  });

  socket.on('typing', (data) => {
    const { chatId } = data;
    socket.to(chatId).emit('typing', data); // Send "typing" to other users in the room
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});



