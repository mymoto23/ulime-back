const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Channel = require('./models/channel');
const indexRouter = require('./router/index');
import {setUpCronTasks} from './auto';
import cors from 'cors';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

const config = require('./config');
const port = process.env.PORT || 8000;
app.set('jwt-secret', config.secret);

setUpCronTasks();
app.use(cors({
    credentials: true, // enable set cookie
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: ['http://13.209.211.204:3000', 'http://13.209.211.204', 'http://175.144.44.51:3000', 'http://175.144.44.51', 'http://localhost:3000']
  }));
app.use(indexRouter);

app.get('/', (req, res) => {
    res.send('test');
})

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log("Connected to MongoDB")
});

mongoose.connect(config.mongodbUri);

const server = app.listen(port, () => {
    console.log(`Express server started on port ${port}`);
})