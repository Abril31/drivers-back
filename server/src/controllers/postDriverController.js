const { Driver, Team } = require("../db");
const createDriver = async ({
  id,
  forename,
  surname,
  description,
  image,
  nationality,
  dob,
  teams,
}) => {
  try {
    if (!Array.isArray(teams)) {
      throw new Error("Teams should be an array");
    }

    // Crear el nuevo driver
    const createNewDriver = await Driver.create({
      id,
      forename,
      surname,
      description,
      image,
      nationality,
      dob,
    });

    const databaseTeams = await Team.findAll({
      where: { name: teams },
    });

    await createNewDriver.addTeams(databaseTeams);
    return createNewDriver;
  } catch (error) {
    throw new Error("Driver not created");
  }
};
module.exports = createDriver;
