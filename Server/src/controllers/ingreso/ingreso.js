const { Usuarios, Pagos } = require("../../db");

const ingreso = async (req,res) => {
  const { dni } = req.body;
  try {
    const usuario = await Usuarios.findOne({
      where: { dni },
    });

    if (!usuario) {
      return res.status(404).json("Usuario no encontrado");
    }

    if (usuario.estado !== "activo") {
      return res.status(404).json("acceso denegado, cliente no activo");
    }

    return res.status(202).json("Usuario activo")
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }


};

module.exports = ingreso;
