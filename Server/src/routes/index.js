const { Router } = require("express");

const postClientHndls= require ("../handlers/usuarios/postClientHndls.js");
const getAllClientsHndls= require ("../handlers/usuarios/getAllClientsHndls.js");
const getClientNameHndls= require ("../handlers/usuarios/getClientNameHndls.js");
const putClientHndls= require("../handlers/usuarios/putClientHndls.js");
const deleteClientHdnls= require ("../handlers/usuarios/deleteClientHndls.js");
const postPagoHndls = require("../handlers/pagos/postPagoHndls.js");
const getClientIDHndls = require("../handlers/usuarios/getCliendIDHandls.js");
const putPagoHndls = require("../handlers/pagos/putPagoHndls.js");

const router = Router();

router.post ("/cliente/nuevoCliente",postClientHndls);
router.get("/clientes",getAllClientsHndls);
router.get("/clientes/nombre", getClientNameHndls);
router.put("/cliente/actualizarCliente", putClientHndls);
router.delete("/clientes/eliminarCliente", deleteClientHdnls);
router.get("/cliente/:id", getClientIDHndls)

// pagos
router.post("/clientes/pago", postPagoHndls)
router.put("/cliente/actualizarPago/:idPago", putPagoHndls);


module.exports = router;
