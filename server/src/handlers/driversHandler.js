const {
  driverById,
  getDriverByName,
  getAllDrivers,
} = require("../controllers/driversController");
const createDriver = require("../controllers/postDriverController");

const getDriversHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const driverByName = await getDriverByName(name);
      if (driverByName.length === 0) {
        res
          .status(404)
          .json({ message: "Driver not found, please try a different name" });
      } else {
        res.status(200).json(driverByName);
      }
    } else {
      const allDrivers = await getAllDrivers();
      res.status(200).json(allDrivers);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getDriverByIdHandler = async (req, res) => {
  const { id } = req.params;
  let origin;

  if (isNaN(id)) {
    origin = "dataBase";
  } else {
    origin = "api";
  }
  try {
    const detailDriver = await driverById(id, origin);
    res.status(200).json(detailDriver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createDriverHandler = async (req, res) => {
  const { id, forename, surname, description, image, nationality, dob, teams } =
    req.body;
  try {
    const newDriver = await createDriver({
      id,
      forename,
      surname,
      description,
      image,
      nationality,
      dob,
      teams,
    });

    res.status(201).json(newDriver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDriversHandler,
  getDriverByIdHandler,
  createDriverHandler,
};
