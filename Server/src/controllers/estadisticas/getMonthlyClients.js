const {Usuarios} = require("../../db");
const { Op } = require("sequelize");

const getMonthlyClients= async() =>{

    try {
        const year = new Date().getFullYear(); // Define el año actual
       const months= Array.from({length:12}, (_,i)=> i );
       const results= {}

       for(const month of months){
        const fechaInicio= new Date(year, month, 1)
        const fechaFin = new Date(year, month + 1 , 1);
        const clientesNuevos= await Usuarios.count({
            where:{
                createdAt:{
                    [Op.between]: [fechaInicio, fechaFin]
                }
            }
        });
        results[month + 1] = clientesNuevos;
    }


       return results;

    } catch (error) {
        console.error("Error al clientes nuevos:", error);
    throw new Error("Error al buscar clientes nuevos");
    }
}


module.exports= getMonthlyClients;