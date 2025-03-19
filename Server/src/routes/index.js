const { Router } = require("express");

const postClientHndls = require("../handlers/usuarios/postClientHndls.js");
const getAllClientsHndls = require("../handlers/usuarios/getAllClientsHndls.js");
const getClientNameHndls = require("../handlers/usuarios/getClientNameHndls.js");
const putClientHndls = require("../handlers/usuarios/putClientHndls.js");
const deleteClientHdnls = require("../handlers/usuarios/deleteClientHndls.js");
const postPagoHndls = require("../handlers/pagos/postPagoHndls.js");
const getClientIDHndls = require("../handlers/usuarios/getCliendIDHandls.js");
const putPagoHndls = require("../handlers/pagos/putPagoHndls.js");
const deletePagoHndls = require("../handlers/pagos/deletePagoHndls.js");
const postMembresiasHndls = require("../handlers/membresias/postMembresiasHndls.js");
const putMembresiasHndls = require("../handlers/membresias/putMembresiasHndls.js");
const deleteMembresiasHndls = require("../handlers/membresias/deleteMembresiasHndls");
const getMembresiasHndls = require("../handlers/membresias/getMembresiasHndls.js");
const getMonthlyClientsHndls = require("../handlers/estadisticas/getMonthlyClientsHndls.js");
const test = require("../estadoMembresia/test.js");
const getInactiveClientsMonthHndls = require("../handlers/estadisticas/getInactiveClientsMonthHndls.js");
const getActiveClientsHndls= require("../handlers/estadisticas/getActiveClientsHndls.js")
//const upload= require("../Cloudinary/upload.js");
const ingreso = require("../controllers/ingreso/ingreso.js");

const router = Router();
//upload.single("imagen")
router.post("/cliente/nuevoCliente", postClientHndls);
router.get("/clientes", getAllClientsHndls);
router.get("/cliente/nombre", getClientNameHndls);
router.put("/cliente/actualizarCliente", putClientHndls);
router.delete("/cliente/eliminarCliente/:id", deleteClientHdnls);
router.get("/cliente/:id", getClientIDHndls);


// pagos
router.post("/clientes/pago", postPagoHndls);
router.put("/cliente/actualizarPago/:idPago", putPagoHndls);
router.delete("/cliente/pago/eliminarPago/:idPago", deletePagoHndls);

//Membresias
router.get("/membresias", getMembresiasHndls);
router.post("/nuevaMembresia", postMembresiasHndls);
router.put("/modificarMembresia/:idMembresia", putMembresiasHndls);
router.delete("/eliminarMembresia/:idMembresia", deleteMembresiasHndls);

// estadisticas
router.get("/estadisticas/clientes-nuevos", getMonthlyClientsHndls);
router.get("/estadisticas/clientes-vencidos", getInactiveClientsMonthHndls);
router.get("/estadisticas/clientes-activos",getActiveClientsHndls);


//test estado membresia 
router.get("/estadoMembresia", test)

// ingreso de cliente
router.post("/ingreso",ingreso )

module.exports = router;
