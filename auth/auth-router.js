const bcrypt = require("bcryptjs");

const router = require("express").Router();

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash;

  Users.add(user)
    .then((saved) => {
      res.status(201).json({ saved });
    })
    .catch((err) => {
      res.status(500).json({ message: "problems with the db", error: err });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = {id: user.id};
        res.status(200).json({ message: "Logged in" });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "problem with the db", error: err });
    });
});

router.get("/users", (req, res) => {
    if (req.session && req.session.user) {
        Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
    } else {
        res.status(401).json({ message: "You shall not pass!" })
    }
});

module.exports = router;
