
const { Op } = require("sequelize");
const {Usuarios, Pagos} =require ("../../db.js");
const moment = require("moment");

const getActiveClients= async()=>{
    try {
        const year = new Date().getFullYear();
        const months=Array.from({length:12},(_,i)=>i);
        const results={}
        

        for(const month of months){
            const fechaInicio= new Date (year, month, 1);
            const fechaFin= new Date(year, month + 1, 1); // toma el mes actual y va aumentando en 1 , siempre tomando el dia 1 
            const clientesActivos= await Usuarios.count({
                where:{
                    estado: "activo",
                                    
                },
                include:{
                    model:Pagos,
                    where:{
                        fechaDeVencimiento:{
                            [Op.between]:[fechaInicio, fechaFin],
                           
                        },
                        estadoPago:"pagado"
                    }
                }
            })
            results[month + 1] = clientesActivos

        }

        return results 
    } catch (error) {
        console.error("Error al buscar clientes activos", error)
        throw new Error("Error al buscar clientes activos")
    }
}

module.exports = getActiveClients