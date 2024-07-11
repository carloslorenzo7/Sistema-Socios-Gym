const {Membresias}= require("../../db")

const getMembresias=async(req)=>{

    try {

        const membresias= await Membresias.findAll()

        if(!membresias){
            return{message:"No hay membresias registradas"}
        }

        return membresias
        
    } catch (error) {
        throw new Error("Error al buscar membresias");
    }
};

module.exports= getMembresias;