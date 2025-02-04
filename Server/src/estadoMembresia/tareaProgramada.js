const cron = require("node-cron");
const actEstadoMembresia= require("./actEstadoMembresia")

// Programar la tarea para que se ejecute todos los días a medianoche
cron.schedule("*/10 * * * *", actEstadoMembresia);

console.log("Tarea programada para actualizar estados de membresía a medianoche.");