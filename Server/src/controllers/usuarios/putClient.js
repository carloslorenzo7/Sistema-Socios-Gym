const { Usuarios, Pagos } = require("../../db");

const putClient = async (req) => {
  try {
    const { id, nombre, email, dni, estado } = req.body;

    const user = await Usuarios.findByPk(id);

    if (!user) {
      return { error: "Usuario no encontrado" };
    }

    if (nombre) {
      user.nombre = nombre;
    }
    if (email) {
      user.email = email;
    }
    if (dni) {
      user.dni = dni;
    }
    if (estado) {
      user.estado = estado;
    }

    await user.save();

    return { message: "Usuario actualizado exitosamente" };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = putClient;
