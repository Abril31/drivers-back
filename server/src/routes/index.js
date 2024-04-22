const { Router } = require("express");
const teamsRouter = require("./teamsRouter");
const driversRouter = require("./driversRouter");
const router = Router();

//si llego a drivers o teams mandar a la ruta respectiva
router.use("/drivers", driversRouter);
router.use("/teams", teamsRouter);

module.exports = router;
