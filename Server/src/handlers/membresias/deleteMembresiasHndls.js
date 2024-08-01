const deleteMembresias= require("../../controllers/membresias/deleteMembresias");

const deleteMembresiasHndls= async(req,res) =>{
    try {
        
        const membresia= await deleteMembresias(req);
        res.status(200).json(membresia)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};

module.exports= deleteMembresiasHndls;