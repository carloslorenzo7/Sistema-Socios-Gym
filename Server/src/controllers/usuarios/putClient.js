const { Usuarios, Pagos } = require("../../db");
const moment = require("moment");

const putClient = async (req) => {
  try {
    const { email, dni} = req.body;
    let { nombre } = req.query;
    nombre = decodeURIComponent(nombre); // Decodificar la cadena de consulta para que se ponga en automatico el %20 en los espacios
    console.log("Nombre recibido:", nombre);
    console.log("Email recibido:", email);
    console.log("DNI recibido:", dni);
    

    const user = await Usuarios.findOne({ where: { nombre } });
    console.log("Usuario encontrado:", user);

    if (!user) {
      return { error: "Usuario no encontrado" };
    }

    if (email) {
      user.email = email;
    }

    if (dni) {
      user.dni = dni;
    }

    await user.save();
    console.log("Usuario actualizado:", user);

    return { message: "Usuario actualizado exitosamente" };
  } catch (error) {
    
    return { error: error.message };
  }
};

module.exports = putClient;
