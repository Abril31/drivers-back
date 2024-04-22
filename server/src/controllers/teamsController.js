const axios = require("axios");
const { Team } = require("../db");

const teams = async () => {
  try {
    const response = await axios.get("http://localhost:5000/drivers");
    const data = response.data;

    const filteredTeams = data
      .map((driver) => driver.teams)
      .filter((teams) => teams !== null && teams !== undefined)
      .flatMap((team) =>
        team.includes(",")
          ? team.split(",").map((team) => team.trim())
          : team.trim()
      );
    //Modificador global g
    const finalTeams = [
      ...new Set(filteredTeams.map((team) => team.replace(/–/g, "-"))),
    ].sort();

    // Cargar a la base de Datos
    await Promise.all(
      finalTeams.map(async (team) => {
        await Team.findOrCreate({
          where: { name: team },
        });
      })
    );
    return finalTeams;
  } catch (error) {
    throw new Error("There was error.");
  }
};

module.exports = teams;
