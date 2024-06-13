const {Usuarios,Pagos}= require("../../db")



  
  const allClients = async () => {
    try {
      const clients = await Usuarios.findAll({
        include: Pagos,
        order: [['id', 'ASC']] // Ordenar por el ID de forma ascendente
      });
  
      if (clients.length === 0) {
        return { message: "No se encontraron usuarios" };
      }
  
      return clients;

    } catch (error) {
        console.error("Error al buscar usuarios:", error);
        throw new Error("Error al buscar usuarios");
    }
}

module.exports= allClients;