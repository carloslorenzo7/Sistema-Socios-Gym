const { Pagos, Usuarios, Membresias } = require("../../db");
const moment = require("moment-timezone");

const postPago = async (req) => {
  try {
    const {
      idUsuario,
      idMembresia,
      fechaDePago,
      estadoPago,
    } = req.body;

    // Crear la fecha de pago con la hora actual en la zona horaria de Argentina
    const fechaPagoDate = moment.tz(
      fechaDePago + " " + moment().format("HH:mm:ss"),
      "YYYY-MM-DD HH:mm:ss",
      "America/Argentina/Buenos_Aires"
    );
    if (!fechaPagoDate.isValid()) {
      throw new Error("Invalid time value");
    }

    // Obtener la membresía para calcular el monto y la fecha de vencimiento
    const membresia = await Membresias.findByPk(idMembresia);

    if (!membresia) {
      throw new Error("Membresía no encontrada");
    }

    // Calcular la fecha de vencimiento usando la duración de la membresía
    const fechaDeVencimiento = fechaPagoDate.clone().add(membresia.duracion, "days");

    // Convertir a UTC antes de guardar en la base de datos
    const fechaPagoUtc = fechaPagoDate.clone().utc().format();
    const fechaDeVencimientoUtc = fechaDeVencimiento.clone().utc().format();

    // Crear el nuevo pago con la fecha de vencimiento calculada y el precio de la membresía
    const nuevoPago = await Pagos.create({
      idUsuario,
      idMembresia,
      fechaDePago: fechaPagoUtc,
      fechaDeVencimiento: fechaDeVencimientoUtc,
      monto: membresia.precio,
      estadoPago,
    });

    // Actualizar el estado del usuario para que coincida con el estado del pago
    const usuario = await Usuarios.findByPk(idUsuario);
    if (usuario) {
      usuario.estado = estadoPago === "pagado" ? "activo" : "vencido";
      await usuario.save();
    }

    return {
      message: "Pago realizado exitosamente y estado de usuario actualizado",
      pago: nuevoPago,
    };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = postPago;
