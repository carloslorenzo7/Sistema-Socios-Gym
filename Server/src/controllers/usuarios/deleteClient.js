const { Usuarios } = require("../../db"); // Asegúrate de que la ruta es correcta

const deleteClient = async (req) => {
  try {
    const { id } = req.params;

    console.log(`Intentando eliminar el cliente con ID: ${id}`);

    const user = await Usuarios.findOne({ where: { id } });

    if (!user) {
      console.log("Usuario no encontrado");
      return { error: "Usuario no encontrado" };
    }

    await user.destroy();
    console.log("Usuario eliminado exitosamente");

    return { message: "Usuario eliminado exitosamente" };
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return { error: error.message };
  }
};

module.exports = deleteClient;
