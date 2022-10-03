const conn = require("./conn");
const { Sequelize } = conn;

const Validation = conn.define("validation", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  parameter: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Validation;
