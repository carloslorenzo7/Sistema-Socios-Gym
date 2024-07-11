const { Pagos, Usuarios, Membresias } = require("../../db");
const moment = require("moment-timezone");

const postPago = async (req) => {
  try {
    const {
      idUsuario,
      idMembresia,
      fechaDePago,
      monto, 
      metodoPago,
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
    console.log("Fecha Pago Zoned:", fechaPagoDate.format());

    //Obtengo la membresia para calcualr la fecha de vencimiento

    const membresia = await Membresias.findByPk(idMembresia);

    if (!membresia) {
      throw new Error("Membresia no encontrada");
    }

    // Calcular la fecha de vencimiento usando la duración de la membresía
    const fechaDeVencimiento = fechaPagoDate
      .clone()
      .add(membresia.duracion, "days");

    // Convertir a UTC antes de guardar en la base de datos
    const fechaPagoUtc = fechaPagoDate.clone().utc().format();
    const fechaDeVencimientoUtc = fechaDeVencimiento.clone().utc().format();

    console.log("Fecha Pago UTC:", fechaPagoUtc);
    console.log("Fecha Vencimiento UTC:", fechaDeVencimientoUtc);

    // Crear el nuevo pago con la fecha de vencimiento calculada
    const nuevoPago = await Pagos.create({
      idUsuario,
      idMembresia,
      fechaDePago: fechaPagoUtc,
      fechaDeVencimiento: fechaDeVencimientoUtc,
      monto,
      metodoPago,
      estadoPago,
    });

    // actualizacion del estado de membresia
    const usuario = await Usuarios.findByPk(idUsuario);
    if (usuario) {
      console.log("Usuario antes de la actualización:", usuario);
      usuario.estado = estadoPago === "pagado" ? "activo" : "sin membresia";
      await usuario.save();
      console.log("Usuario después de la actualización:", usuario);
    }

    return {
      message: "Pago realizado exitosamente y estado de membresía actualizado",
      pago: nuevoPago,
    };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = postPago;
