const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Channel = require('./models/channel');
const indexRouter = require('./router/index');
import {setUpCronTasks} from './auto';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

const config = require('./config');
const port = process.env.PORT || 8000;
app.set('jwt-secret', config.secret);

setUpCronTasks();
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