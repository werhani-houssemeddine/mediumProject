const redis = require('redis');
require('dotenv').config(); // to get redis host and port

function connect() {
    const client = redis.createClient({
        legacyMode: true,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    });
    client.connect();// to connect to redis client
    client.on('error', (err) => console.error(err));
    client.on('connect', () => console.log('Connected to redis done'));

    return client;
}