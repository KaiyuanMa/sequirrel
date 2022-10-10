const { DataSet } = require("../index");
const { Model } = require("../index");
const { Node } = require("../index");
const { Edge } = require("../index");
const { Entry } = require("../index");

const seedUserDataset = async (userId) => {
  try {
    const dataSet = await DataSet.create({ name: "Squirrel", userId: userId });
    return dataSet;
  } catch (ex) {
    console.log(ex);
  }
};

const seedUserModel = async (dataSetId) => {
  try {
    const _MODEL = [
      {
        name: "Squirrel",
        dataSetId: dataSetId,
      },
      {
        name: "Tree",
        dataSetId: dataSetId,
      },
      {
        name: "Home",
        dataSetId: dataSetId,
      },
      {
        name: "Nuts",
        dataSetId: dataSetId,
      },
    ];
    const models = await Promise.all(
      _MODEL.map((model) => Model.create(model))
    );
    return models;
  } catch (ex) {
    console.log(ex);
  }
};

const seedUserNode = async (models, dataSetId) => {
  try {
    const _NODE = [
      {
        type: "model",
        positionX: "200",
        positionY: "550",
        dataSetId: dataSetId,
        modelId: models[0].id,
      },
      {
        type: "model",
        positionX: "250",
        positionY: "-350",
        dataSetId: dataSetId,
        modelId: models[1].id,
      },
      {
        type: "model",
        positionX: "-150",
        positionY: "100",
        dataSetId: dataSetId,
        modelId: models[2].id,
      },
      {
        type: "model",
        positionX: "550",
        positionY: "100",
        dataSetId: dataSetId,
        modelId: models[3].id,
      },
    ];
    const nodes = await Promise.all(_NODE.map((node) => Node.create(node)));
    return nodes;
  } catch (ex) {
    console.log(ex);
  }
};

const seedUserEdge = async (nodes, dataSetId) => {
  try {
    const _EDGE = [
      {
        source: nodes[1].id,
        target: nodes[2].id,
        label: "hasMany",
        dataSetId: dataSetId,
        type: "modelEdge",
      },
      {
        source: nodes[1].id,
        target: nodes[3].id,
        label: "hasMany",
        dataSetId: dataSetId,
        type: "modelEdge",
      },
      {
        source: nodes[2].id,
        target: nodes[0].id,
        label: "belongsToMany",
        dataSetId: dataSetId,
        type: "modelEdge",
      },
      {
        source: nodes[3].id,
        target: nodes[0].id,
        label: "belongsTo",
        dataSetId: dataSetId,
        type: "modelEdge",
      },
    ];
    const edge = await Promise.all(_EDGE.map((edge) => Edge.create(edge)));
    return edge;
  } catch (ex) {
    console.log(ex);
  }
};

const seedUserEntry = async (models) => {
  try {
    const _ENTRY = [
      {
        name: "id",
        type: "Sequelize.UUID",
        defaultValue: "Sequelize.UUIDV4",
        primaryKey: true,
        modelId: models[0].id,
      },
      {
        name: "id",
        type: "Sequelize.UUID",
        defaultValue: "Sequelize.UUIDV4",
        primaryKey: true,
        modelId: models[1].id,
      },
      {
        name: "id",
        type: "Sequelize.UUID",
        defaultValue: "Sequelize.UUIDV4",
        primaryKey: true,
        modelId: models[2].id,
      },
      {
        name: "id",
        type: "Sequelize.UUID",
        defaultValue: "Sequelize.UUIDV4",
        primaryKey: true,
        modelId: models[3].id,
      },
      {
        name: "name",
        type: "Sequelize.STRING",
        allowNull: false,
        unique: true,
        modelId: models[0].id,
      },
      {
        name: "name",
        type: "Sequelize.STRING",
        allowNull: false,
        unique: true,
        modelId: models[1].id,
      },
      {
        name: "name",
        type: "Sequelize.STRING",
        allowNull: false,
        unique: true,
        modelId: models[2].id,
      },
      {
        name: "type",
        type: "Sequelize.STRING",
        allowNull: false,
        unique: false,
        modelId: models[1].id,
      },
      {
        name: "age",
        type: "Sequelize.INTEGER",
        allowNull: false,
        modelId: models[1].id,
      },
    ];
    const entries = await Promise.all(
      _ENTRY.map((entry) => Entry.create(entry))
    );
    return entries;
  } catch (ex) {
    console.log(ex);
  }
};

const seed = async (userId) => {
  try {
    const dataSet = await seedUserDataset(userId);
    const models = await seedUserModel(dataSet.id);
    const nodes = await seedUserNode(models, dataSet.id);
    const edges = await seedUserEdge(nodes, dataSet.id);
    const entry = await seedUserEntry(models);
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = seed;
