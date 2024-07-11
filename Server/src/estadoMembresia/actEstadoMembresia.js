
const { Usuarios, Pagos } = require("../db");
const moment = require("moment");

const actEstadoMembresia = async () => {
  try {
    const usuarios = Usuarios.findAll({
      include: {
        model: Pagos,
        where: { estadoPago: "pagado" },
      },
    });

    //itero sobre los usuarios en busqueda de los pagos

    usuarios.forEach(async (usuario) => {
      const tienePagoActivo = usuario.Pagos.some((pago) =>
        moment().isBefore(pago.fechaDeVencimiento)
      );

      usuario.estado = tienePagoActivo ? "activo" : "vencido";
      await usuario.save();
    });
  } catch (error) {
    console.error("Error actualizando estados de membresía:", error);
  }
};



module.exports = actEstadoMembresia;
