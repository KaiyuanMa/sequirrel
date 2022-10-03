const conn = require("./conn");
const { Sequelize } = conn;

const Entry = conn.define("entry", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  autoIncrement: {
    type: Sequelize.BOOLEAN,
  },
  type: {
    type: Sequelize.STRING,
  },
  defaultValue: {
    type: Sequelize.STRING,
  },
  unique: {
    type: Sequelize.BOOLEAN,
  },
  allowNull: {
    type: Sequelize.BOOLEAN,
  },
  primaryKey: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = Entry;
