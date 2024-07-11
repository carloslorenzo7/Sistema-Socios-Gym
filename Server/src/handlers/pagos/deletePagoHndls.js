const deletePago= require("../../controllers/pagos/deletePago");


const deletePagoHndls= async (req ,res)=>{
    try {
        
        const pago= await deletePago(req);

         res.status(200).json(pago);

    } catch (error) {
       res.status(400).json({error: error.message})
    }
}


module.exports = deletePagoHndls;