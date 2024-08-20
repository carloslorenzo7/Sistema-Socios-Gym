const getMonthlyClients = require("../../controllers/estadisticas/getMonthlyClients");


const getMonthlyClientsHndls= async(req,res) =>{
    try {
        const clientesNuevosHnlds= await getMonthlyClients(req)
        return res.status(200).json(clientesNuevosHnlds)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

module.exports = getMonthlyClientsHndls;