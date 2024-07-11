const {Membresias} = require("../../db")


const putMembresias= async(req) =>{

const {idMembresia}= req.params
const{nombre,descripcion,duracion,precio}=req.body


    try {
        
        const membresia= await Membresias.findByPk(idMembresia);

        if(!membresia){
            return{message:"Membresia no encontrada"};
        }

        if(nombre) membresia.nombre =nombre;
        if(descripcion) membresia.descripcion= descripcion;
        if(duracion) membresia.duracion=duracion;
        if(precio) membresia.precio= precio;

        await membresia.save()
        return {message:"Membresia actualizada exitosamente"}


    } catch (error) {
        return { error: error.message };
    }
}

module.exports = putMembresias;