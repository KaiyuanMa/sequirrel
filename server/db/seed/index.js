const { conn } = require("../index");
const seedUser = require("./user");
const createAndSeedDataSet = require("./dataSet");
const createAndSeedModel = require("./model");
const createAndSeedEntry = require("./entry");
const createAndSeedValidations = require("./validation");
const createAndSeedNode = require("./node");
const createAndSeedEdge = require("./edge");
const { Model } = require("../index");
const syncAndSeed = async () => {
  try {
    await conn.sync({ force: true });
    const users = await seedUser();
    const dataSets = await createAndSeedDataSet(users);
    const models = await createAndSeedModel(dataSets);
    const nodes = await createAndSeedNode(models, dataSets);
    const edges = await createAndSeedEdge(nodes, dataSets, models);
    const entries = await createAndSeedEntry(models);
    const validations = await createAndSeedValidations(entries);
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = syncAndSeed;
