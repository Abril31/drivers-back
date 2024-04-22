const { Router } = require("express");
const getAllTeamsHandler = require("../handlers/teamsHandler");
const teamsRouter = Router();

teamsRouter.get("/", getAllTeamsHandler);

module.exports = teamsRouter;
