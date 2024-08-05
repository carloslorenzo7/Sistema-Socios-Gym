const { Pagos, Usuarios, Membresias } = require("../../db");
const moment = require("moment");

const putPago = async (req) => {
  try {
    const { idPago } = req.params;
    const { fechaDePago, estadoPago, idMembresia } = req.body;

    const pago = await Pagos.findByPk(idPago);
    if (!pago) {
      return { message: "Pago no encontrado" };
    }

    // Actualizar los campos del pago
    if (fechaDePago) pago.fechaDePago = fechaDePago;
    if (estadoPago) pago.estadoPago = estadoPago;

    // Obtener la membresía para calcular la fecha de vencimiento
    if (idMembresia) {
      const membresia = await Membresias.findByPk(idMembresia);
      if (membresia) {
        const fechaPagoDate = moment(fechaDePago);
        const fechaDeVencimiento = fechaPagoDate.clone().add(membresia.duracion, "days");
        pago.fechaDeVencimiento = fechaDeVencimiento.utc().format();
      }
    }

    await pago.save();

    // Actualizar el estado del usuario para que coincida con el estado del pago
    const usuario = await Usuarios.findByPk(pago.idUsuario);
    if (usuario) {
      usuario.estado = estadoPago === "pagado" ? "activo" : "vencido";
      await usuario.save();
    }

    return {
      message: "Pago actualizado exitosamente y estado de usuario actualizado",
    };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = putPago;
