const { Edge } = require("../index");

const createAndSeedEdge = async (nodes, dataSets, models) => {
  try {
    const _EDGE = [
      {
        source: nodes[0].id,
        target: nodes[1].id,
        label: "hasMany",
        dataSetId: dataSets[0].id,
        type: "modelEdge",
      },
      {
        source: nodes[0].id,
        target: nodes[2].id,
        label: "hasOne",
        dataSetId: dataSets[0].id,
        type: "modelEdge",
      },
    ];
    const edge = await Promise.all(_EDGE.map((edge) => Edge.create(edge)));
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = createAndSeedEdge;
