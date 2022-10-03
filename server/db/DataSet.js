const conn = require("./conn");
const { Sequelize } = conn;

const DataSet = conn.define("dataSet", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = DataSet;
