const express = require("express");
const router = express.Router();
const { isLoggedIn, haveAccess } = require("./middleware");
const { DataSet, Model, Entry, Validation } = require("../db");

//GET

router.get("/:validationId", isLoggedIn, haveAccess, async (req, res, next) => {
  try {
    res.send(await Validation.findByPk(req.params.validationId));
  } catch (ex) {
    next(ex);
  }
});

//DELETE

router.delete(
  "/:validationId",
  isLoggedIn,
  haveAccess,
  async (req, res, next) => {
    try {
      const validation = await Validation.findByPk(req.params.validationId);
      await validation.destroy();
      res.sendStatus(202);
    } catch (ex) {
      next(ex);
    }
  }
);

//POST

router.post("/", isLoggedIn, haveAccess, async (req, res, next) => {
  try {
    const entry = await Entry.findByPk(req.body.entryId);
    const model = await Model.findByPk(entry.modelId);
    const dataSet = await DataSet.findByPk(model.dataSetId);
    if (dataSet.userId != req.user.id) throw "Wrong User";
    res.status(201).send(await Validation.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

//PUT

router.put("/:validationId", isLoggedIn, haveAccess, async (req, res, next) => {
  try {
    await Validation.update(req.body, {
      where: { id: req.params.validationId },
    });
    res.sendStatus(201);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
