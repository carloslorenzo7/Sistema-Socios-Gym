const { Router } = require("express");

const postClientHndls= require ("../handlers/usuarios/postClientHndls.js");
const getAllClientsHndls= require ("../handlers/usuarios/getAllClientsHndls.js");
const getClientNameHndls= require ("../handlers/usuarios/getClientNameHndls.js");
const putClientHndls= require("../handlers/usuarios/putClientHndls.js");
const deleteClientHdnls= require ("../handlers/usuarios/deleteClientHndls.js");
const postPagoHndls = require("../handlers/pagos/postPagoHndls.js");
const getClientIDHndls = require("../handlers/usuarios/getCliendIDHandls.js");
const putPagoHndls = require("../handlers/pagos/putPagoHndls.js");
const  deletePagoHndls = require("../handlers/pagos/deletePagoHndls.js");
const postMembresiasHndls = require("../handlers/membresias/postMembresiasHndls.js");
const putMembresiasHndls = require("../handlers/membresias/putMembresiasHndls.js");
const deleteMembresiasHndls=require("../handlers/membresias/deleteMembresiasHndls");
const getMembresiasHndls = require("../handlers/membresias/getMembresiasHndls.js");

const router = Router();

router.post ("/cliente/nuevoCliente",postClientHndls);
router.get("/clientes",getAllClientsHndls);
router.get("/cliente/nombre", getClientNameHndls);
router.put("/cliente/actualizarCliente", putClientHndls);
router.delete("/clientes/eliminarCliente", deleteClientHdnls);
router.get("/cliente/:id", getClientIDHndls)

// pagos
router.post("/clientes/pago", postPagoHndls)
router.put("/cliente/actualizarPago/:idPago", putPagoHndls);
router.delete("/cliente/pago/eliminarPago/:idPago" , deletePagoHndls);

//Membresias
router.get("/membresias", getMembresiasHndls);
router.post("/nuevaMembresia", postMembresiasHndls);
router.put("/modificarMembresia/:idMembresia", putMembresiasHndls);
router.delete("/eliminarMembresia/:idMembresia", deleteMembresiasHndls)

module.exports = router;
