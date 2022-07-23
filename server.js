const express = require('express');
const mongoose = require('mongoose');
const { handleError } = require('vue');

// import dotenv file 
require('dotenv').config();
// local files
const userRoutes = require('./src/routes/index');
const connectMongo = require('./db/mongo');
const session = require('./lib/session');

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by'); //to hide from user that we use express 
app.use(express.urlencoded({extended: true})); // to parse the body of an http request
app.use(express.json()); // to parse a json playload

//configue session
app.use(session);

//connect to mongo db
connectMongo(process.env.MONGO_URI);

//we set up new router and tell app to use this router
//for any path beginning with '/api'
const apiRouter = express.Router();
app.use('/api', apiRouter);
apiRouter.use('/users', userRoutes);

app.listen(PORT, () => console.log(`Listenning on port ${PORT}`));