const express = require("express");
const router = express.Router();
const { isLoggedIn, haveAccess } = require("./middleware");
const { DataSet, Model, Entry, Validation } = require("../db");

//GET
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await DataSet.findAll({ where: { userId: req.user.id } }));
  } catch (ex) {
    next(ex);
  }
});

router.get("/:dataSetId", isLoggedIn, haveAccess, async (req, res, next) => {
  try {
    res.send(await DataSet.findByPk(req.params.dataSetId));
  } catch (ex) {
    next(ex);
  }
});

router.get("/recent/dataset", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await DataSet.findByPk(req.user.recentDataSet));
  } catch (ex) {
    next(ex);
  }
});

router.get(
  "/:dataSetId/model",
  isLoggedIn,
  haveAccess,
  async (req, res, next) => {
    try {
      res.send(
        await Model.findAll({
          where: { dataSetId: req.params.dataSetId },
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
  }
);

//DELETE

router.delete("/:dataSetId", isLoggedIn, haveAccess, async (req, res, next) => {
  try {
    const dataSet = await DataSet.findByPk(req.params.dataSetId);
    await dataSet.destroy();
    res.sendStatus(202);
  } catch (ex) {
    next(ex);
  }
});

//POST

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    if (req.body.userId !== req.user.id) throw "Wrong User";
    res.status(201).send(await DataSet.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

//PUT

router.put("/:dataSetId", isLoggedIn, haveAccess, async (req, res, next) => {
  try {
    res.send(
      await DataSet.update(req.body, {
        where: { id: req.params.dataSetId },
      })
    );
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
