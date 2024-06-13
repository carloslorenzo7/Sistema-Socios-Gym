const getClientID= require("../../controllers/usuarios/getClientID");

const getClientIDHndls= async(req,res) =>{

    try {
        
        const user= await getClientID(req);

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

module.exports= getClientIDHndls;