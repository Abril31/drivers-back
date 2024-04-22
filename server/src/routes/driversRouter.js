const { Router } = require("express");
const {
  getDriverByIdHandler,
  createDriverHandler,
  getDriversHandler,
} = require("../handlers/driversHandler");
const driversRouter = Router();

driversRouter.get("/", getDriversHandler);
driversRouter.get("/:id", getDriverByIdHandler);
driversRouter.post("/", createDriverHandler);

module.exports = driversRouter;
