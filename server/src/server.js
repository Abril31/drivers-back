const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const driversRouter = require("./routes/driversRouter");
const teamsRouter = require("./routes/teamsRouter");

const server = express();

server.use(morgan("dev"));
server.use(cors());
server.use(express.json());

server.use(router, driversRouter, teamsRouter);

module.exports = server;
