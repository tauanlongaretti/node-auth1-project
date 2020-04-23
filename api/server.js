const express = require('express');

const authRouter = require('../auth/auth-router.js');

const server = express();

server.use(express.json());

server.use('/api', authRouter);

server.get('/', (req, res) => {
    res.json({ api: "up" })
});

module.exports = server;