const express = require("express");
const router = express.Router();
const { User } = require("../db");
const { isLoggedIn } = require("./middleware");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", async (req, res, next) => {
  try {
    const credentials = {
      username: req.body.username,
      password: req.body.password,
    };
    res.send({ token: await User.authenticate(credentials) });
  } catch (ex) {
    next(ex);
  }
});

router.get("/", isLoggedIn, async (req, res, next) => {
  res.send(req.user);
});
router.post("/signup", async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {
        username: req.body.username,
      },
    });
    if (users.length === 0) {
      await User.create(req.body);
      const credentials = {
        username: req.body.username,
        password: req.body.password,
      };
      res.send({ token: await User.authenticate(credentials) });
    } else {
      const credentials = {
        username: req.body.username,
        password: req.body.password,
      };
      res.send({ token: await User.authenticate(credentials) });
    }
  } catch (er) {
    next(er);
  }
});

router.put("/recent", isLoggedIn, async (req, res, next) => {
  try {
    await User.update(req.body, {
      where: { id: req.user.id },
    });
    res.sendStatus(201);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
