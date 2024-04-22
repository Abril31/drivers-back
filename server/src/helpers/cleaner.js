const cleanArray = (array) => {
  return array.map((driver) => {
    let defaultImage =
      "https://images.pexels.com/photos/18373115/pexels-photo-18373115/free-photo-of-coche-vehiculo-prisa-neumatico.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    return {
      id: driver.id,
      forename: driver.name.forename,
      surname: driver.name.surname,
      description: driver.description,
      image: driver.image ? driver.image.url : defaultImage,
      nationality: driver.nationality,
      dob: driver.dob,
      teams: driver.teams,
      created: false,
    };
  });
};
const cleanArrayId = (array) => {
  return array.map((driver) => {
    let teams = driver.Teams ? driver.Teams.map((team) => team.name) : [];
    let defaultImage =
      "https://images.pexels.com/photos/18373115/pexels-photo-18373115/free-photo-of-coche-vehiculo-prisa-neumatico.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    return {
      id: driver.id,
      forename: driver.forename,
      surname: driver.surname,
      description: driver.description,
      image: driver.url ? driver.url : defaultImage,
      nationality: driver.nationality,
      dob: driver.dob,
      teams: teams.join(", "),
      created: true,
    };
  });
};

module.exports = { cleanArray, cleanArrayId };
