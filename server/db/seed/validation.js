const { Validation } = require("../index");

const createAndSeedValidations = async (entries) => {
  try {
    const _VALID = [
      {
        name: "isEmail",
        parameter: "true",
        entryId: entries[2].id,
      },
      {
        name: "len",
        parameter: "[5,30]",
        entryId: entries[2].id,
      },
      {
        name: "isLowercase",
        parameter: "true",
        entryId: entries[2].id,
      },
    ];
    const validations = await Promise.all(
      _VALID.map((validation) => Validation.create(validation))
    );
    return validations;
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = createAndSeedValidations;
