// In this file i will site up session, I will use redis as a db for the session store
const session = require('express-session');
require('dotenv').config(); // to get session secret
const RedisStore = require('connect-redis')(session);

// redis client 
//const client = require('../db/redis');

module.exports = session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    name: 'session', // the default name is connect.sid => that is informe user what language we use 
    cookie: {
        httpOnly: true, // dont allow client side to access cookies
        secure: false, // for https connections
    },
    //I will skip it for now because i have not install redis on my machine
    //don't forget to import redis client 
    //store: new RedisStore({client, logErrors: true}),
});