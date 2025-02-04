
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
      const tienePagoActivo = usuario.Pagos.some((pago) =>{

        const fechaVencimiento= new Date (pago.fechaDeVencimiento);
        const fechaActual = new Date(); // fecha y hora actuales 
        console.log("fecha acutal:",fechaActual)
        console.log("fecha vencimiento:",fechaVencimiento)
        let fechas=fechaActual <= fechaVencimiento; // comparo si aun no vence
        console.log("fechas: ",fechas);
        
        return fechas;
      });
      

      const nuevoEstado = tienePagoActivo ? "activo" : "vencido";
      if(usuario.estado != nuevoEstado){
        usuario.estado = nuevoEstado
        await usuario.save();
        console.log(`Usuario ${usuario.id} actualizado a ${usuario.estado}`);
      } else{
        console.log(`Usuario ${usuario.id} ya estaba en estado ${usuario.estado}`);
      }
    };
  } catch (error) {
    console.error("Error actualizando estados de membresía:", error);
    throw error;
  }
};



module.exports = actEstadoMembresia;
