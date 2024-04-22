const teams = require("../controllers/teamsController");

const getAllTeamsHandler = async (req, res) => {
  try {
    const dataTeams = await teams();
    res.status(200).json(dataTeams);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getAllTeamsHandler;
