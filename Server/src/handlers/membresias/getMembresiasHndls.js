const getMembresias= require("../../controllers/membresias/getMembresias")


const getMembresiasHndls= async(req,res)=>{

    try {
        const membresias= await getMembresias(req);

        res.status(200).json(membresias)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};

module.exports= getMembresiasHndls;