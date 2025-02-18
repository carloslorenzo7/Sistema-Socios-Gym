const { Usuarios, Pagos } = require("../../db");
const { Op } = require("sequelize");

const getActiveClientsByMonth = async () => {
    try {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth(); // Mes actual (0-11)

        const results = {};

        for (let month = 0; month < 12; month++) {
            if (month !== currentMonth) {
                // Para los meses que no son el actual, se asigna 0
                results[month + 1] = 0;
                continue;
            }

            const fechaInicio = new Date(currentYear, month, 1);  // Primer día del mes actual
            const fechaFin = new Date(currentYear, month + 1, 0); // Último día del mes actual

            const clientesActivos = await Usuarios.count({
                include: [{
                    model: Pagos,
                    required: true,
                    where: {
                        fechaDeVencimiento: { [Op.gte]: fechaFin }, // Aún activos en este mes
                        estadoPago: "pagado"
                    }
                }],
                where: {
                    estado: "activo"
                }
            });

            results[month + 1] = clientesActivos;
        }

        return results;
    } catch (error) {
        console.error("Error al obtener clientes activos:", error);
        throw new Error("Error al buscar clientes activos");
    }
};

module.exports = getActiveClientsByMonth;
