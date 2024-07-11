const deleteMembresias= require("../../controllers/membresias/deleteMembresias");

const deleteMembresiasHndls= async(req,res) =>{
    try {
        
        const membresia= await deleteMembresias(req);
        res.status(200).json(membresia)
    } catch (error) {
        res.stattus(500).json({error:messsage.error})
    }
};

module.exports= deleteMembresiasHndls;