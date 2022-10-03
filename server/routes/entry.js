const express = require("express");
const router = express.Router();
const { isLoggedIn, haveAccess } = require("./middleware");
const { Entry, Validation, DataSet, Model } = require("../db");

//GET

router.get("/:entryId", isLoggedIn, haveAccess, async (req, res, next) => {
  try {
    res.send(
      await Entry.findByPk(req.params.entryId, {
        include: Validation,
      })
    );
  } catch (ex) {
    next(ex);
  }
});

router.get(
  "/:entryId/validation",
  isLoggedIn,
  haveAccess,
  async (req, res, next) => {
    try {
      res.send(
        await Validation.findAll({ where: { entryId: req.params.entryId } })
      );
    } catch (ex) {
      next(ex);
    }
  }
);

//DELETE

router.delete("/:entryId", isLoggedIn, haveAccess, async (req, res, next) => {
  try {
    const entry = await Entry.findByPk(req.params.entryId);
    await entry.destroy();
    res.sendStatus(202);
  } catch (ex) {
    next(ex);
  }
});

//POST

router.post("/", isLoggedIn, haveAccess, async (req, res, next) => {
  try {
    const model = await Model.findByPk(req.body.modelId);
    const dataSet = await DataSet.findByPk(model.dataSetId);
    if (dataSet.userId != req.user.id) throw "Wrong User";
    res.status(201).send(await Entry.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

//PUT

router.put("/:entryId", isLoggedIn, haveAccess, async (req, res, next) => {
  try {
    await Entry.update(req.body, { where: { id: req.params.entryId } });
    res.sendStatus(201);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
