const postPago= require("../../controllers/pagos/postPago");



const postPagoHndls= async(req,res) =>{

try {
const usuario= await postPago(req);
return res.status(200).json(usuario)    

} catch (error) {
    res.status(500).json({error: error.message})
}


};

module.exports= postPagoHndls;