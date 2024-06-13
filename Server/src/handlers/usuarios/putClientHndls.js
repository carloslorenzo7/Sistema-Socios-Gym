const putClient= require("../../controllers/usuarios/putClient");


const putClientHndls= async (req,res) =>{
    try {
        
        const user= await putClient(req);

        return res.status(200).json(user)


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports= putClientHndls;