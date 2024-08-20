const getActiveClients= require("../../controllers/estadisticas/getActiveClients")


const getActiveClientsHndls= async (req,res) =>{
    try {
        
        const clientesActivos= await getActiveClients();
        res.status(200).json(clientesActivos);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};

module.exports= getActiveClientsHndls