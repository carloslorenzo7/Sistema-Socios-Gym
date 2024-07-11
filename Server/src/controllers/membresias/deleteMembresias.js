const {Membresias} = require("../../db")


const deleteMembresias= async(req) =>{
    const {idMembresia} = req.params

    try {
        
        const membresia= await Membresias.findByPk(idMembresia);
        if(!membresia){
            return{message: "Membresia no encontrada"}
        }

        await membresia.destroy()
        return { message: "Membresia eliminada exitosamente" };
    } catch (error) {
        return {error:message.error}
    }
};

module.exports= deleteMembresias;