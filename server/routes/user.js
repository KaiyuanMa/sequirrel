const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("./middleware");
const { User, DataSet } = require("../db");

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(
      await User.findByPk(req.user.id, {
        attributes: {
          exclude: ["password"],
        },
      })
    );
  } catch (ex) {
    next(ex);
  }
});

router.get("/dataSets", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await DataSet.findAll({ where: { userId: req.user.id } }));
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
