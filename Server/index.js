//index.js: Este archivo es responsable de sincronizar la conexión a la base de datos y arrancar el servidor. Aquí importas tu servidor Express creado en server.js, así como la conexión a la base de datos desde db.js. Luego, sincronizas la base de datos utilizando Sequelize y, una vez que la conexión se ha establecido correctamente, inicias el servidor para que empiece a escuchar las solicitudes entrantes.




const express = require('express');
const { conn } = require('./src/db'); // Importar la conexión a la base de datos desde db.js
const server = require('./src/server'); // Importar el servidor Express desde server.js

require ('dotenv').config() // Cargar variables de entorno desde .env

// Extraer el puerto del archivo .env o utilizar uno predeterminado
const {PORT} = process.env;

// Sincronizar la conexión a la base de datos
conn.sync({ force: false}) .then(() => {
    // Iniciar el servidor
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });