const { useEffect, useState } = require("react");
const conn = require("./conn");
const { Sequelize } = conn;

const Node = conn.define("node", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  positionX: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  positionY: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Node;
