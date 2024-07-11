const getAllClients= require("../../controllers/usuarios/getAllClients");

const allClientsHndls= async(req,res) =>{

    try {
        
        const clientsHndls = await getAllClients();
         res.status(200).json(clientsHndls);



    } catch (error) {
        res.status(500).json({error:error.message})
    }
};

module.exports=allClientsHndls;