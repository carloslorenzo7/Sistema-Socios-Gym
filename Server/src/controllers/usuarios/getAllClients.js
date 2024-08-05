const { Usuarios, Pagos } = require("../../db");

const allClients = async () => {
  try {
    const clients = await Usuarios.findAll({
      include: {
        model: Pagos,
        order: [['fechaDePago', 'DESC']], // Ordenar pagos por fecha de forma descendente para obtener el último pago
        limit: 1 // Solo traer el último pago
      },
      order: [['id', 'ASC']] // Ordenar por el ID de forma ascendente
    });

    if (clients.length === 0) {
      return { message: "No se encontraron usuarios" };
    }

    // Actualizar el estado del usuario basado en el estado del último pago
    clients.forEach(client => {
      if (client.Pagos && client.Pagos.length > 0) {
        const ultimoPago = client.Pagos[0];
        client.estado = ultimoPago.estadoPago; // Actualizar el estado del cliente
      } else {
        client.estado = "sin membresia"; // Si no hay pagos, el estado es "sin membresia"
      }
    });

    return clients;

  } catch (error) {
    console.error("Error al buscar usuarios:", error);
    throw new Error("Error al buscar usuarios");
  }
}

module.exports = allClients;
