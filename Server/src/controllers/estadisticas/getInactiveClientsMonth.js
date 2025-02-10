
const { Op } = require("sequelize");
const {Usuarios, Pagos} =require ("../../db.js");
const moment = require("moment");

const getInactiveClientsMonth= async()=>{
    try {
        const year = new Date().getFullYear();
        const months=Array.from({length:12},(_,i)=>i);
        const results={}
        

        for(const month of months){
            const fechaInicio= new Date (year, month, 1);
            const fechaFin= new Date(year, month + 1, 1); // toma el mes actual y va aumentando en 1 , siempre tomando el dia 1 
            const clientesInactivos= await Usuarios.count({
                where:{
                    estado: "vencido",
                                    
                },
                include:{
                    model:Pagos,
                    where:{
                        fechaDeVencimiento:{
                            [Op.between]:[fechaInicio, fechaFin],
                            // Compruebo si han pasado más de 30 días desde la fecha de vencimiento
                            [Op.lt]: moment().toDate()
                        },
                        estadoPago:"pagado"
                    }
                }
            })
            results[month + 1] = clientesInactivos
        }

        return results 
    } catch (error) {
        console.error("Error al buscar clientes inactivos", error)
        throw new Error("Error al buscar clientes inactivos")
    }
}

module.exports = getInactiveClientsMonth;