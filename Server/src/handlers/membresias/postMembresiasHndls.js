const postMembresias= require("../../controllers/membresias/postMembresias")


const postMembresiasHndls= async(req,res) =>{
    try {
        const membresia= await postMembresias(req);

        res.status(200).json(membresia);



    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports= postMembresiasHndls;