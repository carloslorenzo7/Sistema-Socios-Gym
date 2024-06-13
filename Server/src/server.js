// server.js: Este archivo es el punto de entrada de tu servidor Express. Su función principal es configurar y arrancar el servidor. Aquí es donde importas Express y otros middleware, como Morgan para el registro de solicitudes y CORS para permitir las solicitudes de diferentes orígenes. También es donde montas las rutas definidas en otro archivo (como ./routes) en tu servidor Express. Finalmente, exportas la instancia de tu servidor Express para que pueda ser utilizada en otros archivos.

const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors()); // Permitir todas las solicitudes CORS para todos los orígenes

server.use(router);

module.exports = server;