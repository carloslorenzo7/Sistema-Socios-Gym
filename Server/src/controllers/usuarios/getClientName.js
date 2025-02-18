const { Usuarios, Pagos } = require("../../db");
const { Op } = require("sequelize");

const getClientID = async (req) => {
  try {
    const { nombre } = req.query;
    const user = await Usuarios.findAll({
      where: {
        [Op.or]: [
          {
            nombre: {
              [Op.iLike]: `%${nombre}%`,
            },
          },
          {
            apellido: {
              [Op.iLike]: `%${nombre}%`,
            },
          },
        ],
      },
      include: Pagos,
    });

    console.log("Usuario encontrado:", user);
    return user;
  } catch (error) {
    console.error("Error en la consulta:", error);
    throw new Error(error.message);
  }
};

module.exports = getClientID;
