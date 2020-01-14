// server.js

const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB');
swaggerJsDoc = require('swagger-jsdoc');
swaggerUi = require('swagger-ui-express');

const issueRoute = require('./routes/issue.route');
const userRoute = require('./routes/user.route');
const loginRoute = require('./routes/login.route');
const projectRoute = require('./routes/project.route');
const mainRoute = require('./routes/home.route');
const profilRoute = require('./routes/profil.route');

mongoose.Promise = global.Promise;

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);

mongoose.set('useFindAndModify', false);

const app = express();

const port = process.env.PORT || 4000;

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Bugs Managment API',
            description: "API rest pour le gestion de bugs et d'incidents dans un projet",
            servers: ["http://localhost:4000"]
        },
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(bodyParser.json());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());

app.use('/login', loginRoute);

app.use('/issue', issueRoute);

app.use('/user', userRoute);

app.use('/project', projectRoute);

app.use('/home', mainRoute);

app.use('/profil', profilRoute);



app.listen(port, function() {
    console.log('Listening on port ' + port);
});