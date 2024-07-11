const putMembresias=require("../../controllers/membresias/putMembresias")

const putMembresiasHndls=async(req,res) =>{

try {
    
    const membresiaHndls= await putMembresias(req);
    res.status(200).json(membresiaHndls);

} catch (error) {
    res.status(500).json({error:error.message})
};
};

module.exports=putMembresiasHndls;