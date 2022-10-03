const { Entry } = require("../index");

const createAndSeedEntry = async (models) => {
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
        name: "username",
        type: "Sequelize.STRING",
        allowNull: false,
        unique: true,
        modelId: models[0].id,
      },
      {
        name: "email",
        type: "Sequelize.STRING",
        unique: true,
        modelId: models[0].id,
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

module.exports = createAndSeedEntry;
