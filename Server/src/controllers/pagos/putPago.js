const { Pagos, Usuarios, Membresias } = require("../../db");
const moment = require("moment");

const putPago = async (req) => {
  try {
    const { idPago } = req.params;
    const { fechaDePago, monto, estadoPago, metodoPago } = req.body;

    const pago = await Pagos.findByPk(idPago);
    if (!pago) {
      return { message: "Pago no encontrado" };
    }

// Obtengo el idUsuario del pago existente
const {idUsuario, idMembresia}= pago;


    // Actualizar los campos del pago
    if (fechaDePago) pago.fechaDePago = fechaDePago;
    if (monto) pago.monto = monto;
    if (estadoPago) pago.estadoPago = estadoPago;
    if (metodoPago) pago.metodoPago = metodoPago;

    // Calcular la fecha de vencimiento si se actualizan fechaDePago y cuota
    if (fechaDePago) {
      // Crear la fecha de pago con la hora actual en la zona horaria de Argentina
      const fechaPagoDate = moment.tz(
        fechaDePago + " " + moment().format("HH:mm:ss"),
        "YYYY-MM-DD HH:mm:ss",
        "America/Argentina/Buenos_Aires"
      );
      if (!fechaPagoDate.isValid()) {
        throw new Error("Invalid time value");
      }
      console.log("Fecha Pago Zoned:", fechaPagoDate.format());

      
      // Obtengo la membresía para calcular la fecha de vencimiento
      const membresia = await Membresias.findByPk(idMembresia);
      if (!membresia) {
        throw new Error("Membresia no encontrada");
      }

       // Calcular la fecha de vencimiento usando la duración de la membresía
       const fechaDeVencimiento = fechaPagoDate
       .clone()
       .add(membresia.duracion, "days");

      // Convertir a UTC antes de actualizar en la base de datos
      const fechaPagoUtc = fechaPagoDate.clone().utc().format();
      const fechaDeVencimientoUtc = fechaDeVencimiento.clone().utc().format();

      console.log("Fecha Pago UTC:", fechaPagoUtc);
      console.log("Fecha Vencimiento UTC:", fechaDeVencimientoUtc);

      pago.fechaDePago = fechaPagoUtc;
      pago.fechaDeVencimiento = fechaDeVencimientoUtc;
    }

    await pago.save();

    // actualizcion de estado de membresia
    const usuario = await Usuarios.findByPk(idUsuario);
    if (usuario) {
      usuario.estado = estadoPago === "pagado" ? "activo" : "sin membresia";
      await usuario.save();
    }

    return {
      message:
        "Pago actualizado exitosamente y estado de membresía actualizado",
    };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = putPago;
