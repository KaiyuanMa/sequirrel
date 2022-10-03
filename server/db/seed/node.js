const { Node } = require("../index");

const createAndSeedNode = async (models, dataSets) => {
  try {
    const _NODE = [
      {
        type: "model",
        positionX: 0,
        positionY: 0,
        modelId: models[0].id,
        dataSetId: dataSets[0].id,
      },
      {
        type: "model",
        positionX: -100,
        positionY: 350,
        modelId: models[1].id,
        dataSetId: dataSets[0].id,
      },
      {
        type: "model",
        positionX: 250,
        positionY: 350,
        modelId: models[2].id,
        dataSetId: dataSets[0].id,
      },
    ];
    const nodes = await Promise.all(_NODE.map((node) => Node.create(node)));
    return nodes;
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = createAndSeedNode;
