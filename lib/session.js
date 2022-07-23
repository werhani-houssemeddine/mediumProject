// In this file i will site up session
// i will use redis as a db for the session store
const session = require('express-session');
require('dotenv').config(); // to get session secret
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

const client = redis.createClient({
    legacyMode: true,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});
client.connect();// to connect to redis client
client.on('error', (err) => console.error('Error connection to redis failed: ' + err));
client.on('connect', () => console.log('Redis connection established'));

module.exports = session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    name: 'session', // the default name is connect.sid => that is informe user what language we use 
    cookie: {
        httpOnly: true, // dont allow client side to access cookies
        secure: false, // for https connections
    },
    store: new RedisStore({client, logErrors: true}),
});