// server.js

const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB');

const issueRoute = require('./routes/issue.route');
const userRoute = require('./routes/user.route');
const loginRoute = require('./routes/login.route');
const projectRoute = require('./routes/project.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/issue', issueRoute);

app.use('/user', userRoute);

app.use('/login', loginRoute);

app.use('/project', projectRoute);

const port = process.env.PORT || 4000;

app.listen(port, function() {
    console.log('Listening on port ' + port);
});