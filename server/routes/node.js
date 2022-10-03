const express = require("express");
const router = express.Router();
const { isLoggedIn, haveAccess } = require("./middleware");
const { Model, DataSet, Node } = require("../db");

//GET

router.get("/:dataSetId", isLoggedIn, haveAccess, async (req, res, next) => {
  try {
    res.send(
      await Node.findAll({ where: { dataSetId: req.params.dataSetId } })
    );
  } catch (ex) {
    next(ex);
  }
});

router.get(
  "/model/:modelId",
  isLoggedIn,
  haveAccess,
  async (req, res, next) => {
    try {
      res.send(await Node.findOne({ where: { modelId: req.params.modelId } }));
    } catch (ex) {
      next(ex);
    }
  }
);

//DELETE
router.delete(
  "/model/:modelId",
  isLoggedIn,
  haveAccess,
  async (req, res, next) => {
    try {
      const node = await Node.findOne({
        where: { modelId: req.params.modelId },
      });
      await node.destroy();
      res.sendStatus(202);
    } catch (ex) {
      next(ex);
    }
  }
);

//POST

router.post("/", isLoggedIn, haveAccess, async (req, res, next) => {
  try {
    const model = await Model.findByPk(req.body.modelId);
    const dataSet = await DataSet.findByPk(model.dataSetId);
    if (dataSet.userId != req.user.id) throw "Wrong User";
    res.send(await Node.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

//PUT

router.put("/:modelId", async (req, res, next) => {
  try {
    await Node.update(req.body, {
      where: { modelId: req.params.modelId },
    });
    res.sendStatus(201);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
