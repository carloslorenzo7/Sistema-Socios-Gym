const putPago= require ("../../controllers/pagos/putPago.js")


const putPagoHndls= async (req,res)=>{

    try {
        
        const pago= await putPago(req);
        return res.status(200).json(pago);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports= putPagoHndls;