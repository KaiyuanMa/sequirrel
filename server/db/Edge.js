const conn = require("./conn");
const { Sequelize } = conn;

const Edge = conn.define("edge", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  type: {
    type: Sequelize.STRING,
    defaultValue: "STRAIGHT",
  },
  source: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  target: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  animated: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  label: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Edge;
