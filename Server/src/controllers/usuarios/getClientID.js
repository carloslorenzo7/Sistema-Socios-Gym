const {Usuarios, Pagos}= require("../../db")

const getClientID= async(req) =>{

    const {id}= req.params;
    console.log("id",id);
    try {
        
        const user= await Usuarios.findByPk(id, {
            include:Pagos
        });

        if(!user){
         return {error: "Usuario no encontrado"};
        }
        console.log("user", user);
        return user;


    } catch (error) {
        throw new Error("Error al buscar usuarios");
    }
}

module.exports= getClientID;