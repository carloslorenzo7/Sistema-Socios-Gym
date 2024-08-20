
const { Usuarios, Pagos } = require("../db");
const moment = require("moment");

const actEstadoMembresia = async () => {
  console.log("Iniciando actualización de estados de membresía");
  try {
    const usuarios = await Usuarios.findAll({
      include: {
        model: Pagos,
        where: { estadoPago: "pagado" },
      },
    });
    console.log("Usuarios encontrados:", usuarios);
    console.log(`Usuarios encontrados: ${usuarios.length}`);

    //itero sobre los usuarios en busqueda de los pagos

    for (const usuario of usuarios) {
      const tienePagoActivo = usuario.Pagos.some((pago) =>
        moment().isBefore(pago.fechaDeVencimiento)
      );

      usuario.estado = tienePagoActivo ? "activo" : "vencido";
      await usuario.save();
      console.log(`Usuario ${usuario.id} actualizado a ${usuario.estado}`);
    };
  } catch (error) {
    console.error("Error actualizando estados de membresía:", error);
    throw error;
  }
};



module.exports = actEstadoMembresia;
