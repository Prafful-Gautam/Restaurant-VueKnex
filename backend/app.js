const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const knex = require('./db/knex');
const router = require('./router/restaurant');
const foodRouter = require('./router/foods');
const extractFile = require('./middleware/file');

//parsing body from api
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/images/', express.static(path.join(__dirname, './images')));

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PATCH,PUT,DELETE,OPTIONS"
    );
    next();
  });

app.use('/', (req, res, next) => {
    knex.raw('USE restaurant')
    .then((result) => {
        console.log(result);
    })
    .catch(e => console.log(e));
next();
})

app.use('/rest', router);
app.use('/foods', extractFile, foodRouter);



module.exports = app;