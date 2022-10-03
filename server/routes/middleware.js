const { User, DataSet, Model, Entry, Validation } = require("../db");

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.headers.authorization);
    next();
  } catch (ex) {
    next(ex);
  }
};

const haveAccess = async (req, res, next) => {
  try {
    let dataSet = {};
    if (req.params.validationId) {
      const validation = await Validation.findByPk(req.params.validationId);
      const entry = await Entry.findByPk(validation.entryId);
      const model = await Model.findByPk(entry.modelId);
      dataSet = await DataSet.findByPk(model.dataSetId);
      if (dataSet.userId != req.user.id) throw "Wrong User";
    }
    if (req.params.entryId) {
      const entry = await Entry.findByPk(req.params.entryId);
      const model = await Model.findByPk(entry.modelId);
      dataSet = await DataSet.findByPk(model.dataSetId);
      if (dataSet.userId != req.user.id) throw "Wrong User";
    }
    if (req.params.modelId) {
      const model = await Model.findByPk(req.params.modelId);
      dataSet = await DataSet.findByPk(model.dataSetId);
      if (dataSet.userId != req.user.id) throw "Wrong User";
    }
    if (req.params.dataSetId) {
      dataSet = await DataSet.findByPk(req.params.dataSetId);
      if (dataSet.userId != req.user.id) throw "Wrong User";
    }
    next();
  } catch (ex) {
    next(ex);
  }
};

module.exports = {
  isLoggedIn,
  haveAccess,
};
