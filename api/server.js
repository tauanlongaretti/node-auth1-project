const express = require("express");

const session = require("express-session");

const authRouter = require("../auth/auth-router.js");

const usersRouter = require('../users/users-router.js');

const restricted = require("../auth/restricted-middleware.js");

const server = express();

const sessionConfig = {
  name: "chocolate-chip",
  secret: "myspeshulsecret",
  cookie: {
    maxAge: 3600 * 1000,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUnitialized: false,
};

server.use(express.json());

server.use(session(sessionConfig));

server.use("/api", authRouter);

server.use('/api/users', restricted, usersRouter)

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
