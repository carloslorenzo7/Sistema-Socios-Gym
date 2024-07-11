const {Membresias} = require("../../db");

const postMembresias = async (req) => {
  const { nombre, descripcion, duracion, precio } = req.body;

  try {
    const nuevaMembresia = await Membresias.create({
      nombre,
      descripcion,
      duracion,
      precio,
    });

    return nuevaMembresia; 
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = postMembresias;