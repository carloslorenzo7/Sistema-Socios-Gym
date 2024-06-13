const {Usuarios} = require("../../db")


const deleteClient= async (req) =>{

    try {
        let {nombre}= req.query
        nombre = decodeURIComponent(nombre); // Decodificar la cadena de consulta para que se ponga en automatico el %20 en los espacios 


        console.log(nombre);
        const user= await Usuarios.findOne({where: {nombre}});

        if(!user){
            return {error: "Usuario no encontrado"};
        }

        await user.destroy();

        return { message: "Usuario eliminado exitosamente "}


    } catch (error) {
        return {error: error.message}
    }
};

module.exports = deleteClient;