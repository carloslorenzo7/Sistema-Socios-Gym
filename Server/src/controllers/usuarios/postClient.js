const { Usuarios } = require("../../db");

const postClient = async (nombre,apellido, email, dni) => {
  try {
    const createClient = await Usuarios.create({
      nombre,
      apellido,
      email,
      dni,
    });

    return createClient;
  } catch (error) {
    throw error;
  }
};

module.exports = postClient;
