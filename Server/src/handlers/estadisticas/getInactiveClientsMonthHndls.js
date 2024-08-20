const getInactiveClientsMonth = require("../../controllers/estadisticas/getInactiveClientsMonth")


const getInactiveClientHndls= async (req,res) =>{
    try {
        
        const clientesInactivos= await getInactiveClientsMonth();
        res.status(200).json(clientesInactivos);

    } catch (error) {
        res.status(500).json({error:error.message})
    }
};

module.exports= getInactiveClientHndls;