const {Pagos} =require("../../db");


const deletePago = async (req) => {

    const {idPago} = req.params;
  try {

    const pago= await Pagos.findByPk(idPago);

    if(!pago){
        return {error: "Pago no encontrado"};
    }

    await pago.destroy()

    return { message: 'Pago eliminado correctamente' };


  } catch (error) {

    return {error: error.message}
  }
};

module.exports = deletePago;