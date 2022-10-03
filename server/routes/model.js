const express = require("express");
const router = express.Router();
const { isLoggedIn, haveAccess } = require("./middleware");
const { Model, Entry, Validation, DataSet } = require("../db");

//GET

router.get("/:modelId", isLoggedIn, haveAccess, async (req, res, next) => {
  try {
    res.send(
      await Model.findByPk(req.params.modelId, {
        include: [
          {
            model: Entry,
            include: Validation,
          },
        ],
        order: [[Entry, "createdAt"]],
      })
    );
  } catch (ex) {
    next(ex);
  }
});

router.get(
  "/:modelId/entry",
  isLoggedIn,
  haveAccess,
  async (req, res, next) => {
    try {
      res.send(await Entry.findAll({ where: { modelId: req.params.modelId } }));
    } catch (ex) {
      next(ex);
    }
  }
);

//DELETE

router.delete("/:modelId", isLoggedIn, haveAccess, async (req, res, next) => {
  try {
    const model = await Model.findByPk(req.params.modelId);
    await model.destroy();
    res.sendStatus(202);
  } catch (ex) {
    next(ex);
  }
});

//POST

router.post("/", isLoggedIn, haveAccess, async (req, res, next) => {
  try {
    const dataSet = await DataSet.findByPk(req.body.dataSetId);
    if (dataSet.userId != req.user.id) throw "Wrong User";
    res.send(await Model.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

//PUT

router.put("/:modelId", isLoggedIn, haveAccess, async (req, res, next) => {
  try {
    await Model.update(req.body, {
      where: { id: req.params.modelId },
    });
    res.sendStatus(201);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
