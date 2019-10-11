const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

require('dotenv').config();

const app = express();
const server = http.Server(app);
const io = socketio(server);

const { MONGO_HOST, MONGO_USER, MONGO_PASS } = process.env;
mongoose.connect(
  `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/semana09?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const connectedUsers = {};

io.on('connection', socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
  console.log(connectedUsers)
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
})


app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);
