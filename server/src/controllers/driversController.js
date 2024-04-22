const axios = require("axios");
const { cleanArray, cleanArrayId } = require("../helpers/cleaner");
const { Driver, Team } = require("../db");
const { Op } = require("sequelize");

const getAllDrivers = async () => {
  const dataBaseDrivers = await Driver.findAll({
    include: {
      model: Team,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const response = await axios.get("http://localhost:5000/drivers");
  const apiDrivers = cleanArray(response.data);

  return [...cleanArrayId(dataBaseDrivers), ...apiDrivers];
};

const getDriverByName = async (name) => {
  const response = await axios.get("http://localhost:5000/drivers");
  const apiDrivers = cleanArray(response.data);

  const driverFiltered = apiDrivers
    .filter(
      (driver) =>
        driver.forename.toLowerCase().includes(name.toLowerCase()) ||
        driver.surname.toLowerCase().includes(name.toLowerCase())
    )
    .slice(0, 15);

  const dataBaseDriverName = await Driver.findAll({
    where: {
      [Op.or]: [
        {
          forename: {
            [Op.iLike]: `%${name}%`,
          },
        },
        {
          surname: {
            [Op.iLike]: `%${name}%`,
          },
        },
      ],
    },
    include: [
      {
        model: Team,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
    limit: 15,
  });

  const result = [...driverFiltered, ...cleanArrayId(dataBaseDriverName)];
  if (response.data.length === 0) {
    throw new Error(`No driver found with the name: ${name}`);
  }

  return result;
};
const driverById = async (id, origin) => {
  //Base de Datos:
  if (origin === "dataBase") {
    const dataBaseDriver = await Driver.findByPk(id, {
      include: {
        model: Team,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    return cleanArrayId([dataBaseDriver]);
  } else if (origin === "api") {
    const response = await axios.get(`http://localhost:5000/drivers/${id}`);
    const apiDriver = cleanArray([response.data]);

    return apiDriver;
  } else {
    throw new Error("Therea was a problem with the id");
  }
};
module.exports = { getAllDrivers, driverById, getDriverByName };
