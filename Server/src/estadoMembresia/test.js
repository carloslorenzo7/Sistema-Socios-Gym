const actEstadoMembresia = require ("../estadoMembresia/actEstadoMembresia")
const test =async (req,res) =>{
    try {
        await actEstadoMembresia();
        res.send("Actualizacion de estados de membresia actualizada")
    } catch (error) {
        console.error("Error en la actualización de estados de membresía:", error.message);
        res.status(500).send("Error en la actualizacion de estados de membresia");
        
    }
}

module.exports= test;