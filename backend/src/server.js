const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

require('dotenv').config();

const app = express();

const { MONGO_HOST, MONGO_USER, MONGO_PASS } = process.env;
mongoose.connect(
  `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/semana09?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3333);
