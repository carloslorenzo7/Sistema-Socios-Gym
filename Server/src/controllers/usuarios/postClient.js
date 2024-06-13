const { Usuarios } = require("../../db");

const postClient = async (nombre, email, dni) => {
  try {
    const createClient = await Usuarios.create({
      nombre,
      email,
      dni,
    });

    return createClient;
  } catch (error) {
    throw error;
  }
};

module.exports = postClient;
