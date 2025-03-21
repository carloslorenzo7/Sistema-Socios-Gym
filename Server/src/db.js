// //db.js: Este archivo es donde configuras la conexión a la base de datos utilizando Sequelize. Aquí especificas la configuración de la base de datos, como el nombre de usuario, la contraseña, el host y el nombre de la base de datos. También defines los modelos de Sequelize y las relaciones entre ellos, si los hubiera.  


// require("dotenv").config();
// const { Sequelize} = require("sequelize");


// const fs = require("fs");
// const path = require("path");

// const { DB_USER, DB_PASSWORD, DB_HOST, DATABASE } = process.env;

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DATABASE}`, {
//   logging: false,
// });

// // Cargar modelos de forma dinámica
// const basename = path.basename(__filename);
// const modelDefiners = [];

// fs.readdirSync(path.join(__dirname, "/models"))
//   .filter(
//     (file) =>
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//   )
//   .forEach((file) => {
//     modelDefiners.push(require(path.join(__dirname, "/models", file)));
//   });

  
// // Injectamos la conexion (sequelize) a todos los modelos
//   modelDefiners.forEach((model) => model(sequelize));
// // Capitalizamos los nombres de los modelos ie: product => Product
// let entries = Object.entries(sequelize.models);
// let capsEntries = entries.map((entry) => [
//   entry[0][0].toUpperCase() + entry[0].slice(1),
//   entry[1],
// ]);
// sequelize.models = Object.fromEntries(capsEntries);


// const { Usuarios, Pagos ,Membresias  } = sequelize.models;

// // Aca vendrian las relaciones

// Usuarios.hasMany(Pagos, { foreignKey: 'idUsuario' }); // Un usuario puede tener varios pagos asociados
// Pagos.belongsTo(Usuarios, { foreignKey: 'idUsuario', as: 'usuario' }); // Cada pago está asociado a un solo usuario

// Membresias.hasMany(Pagos, {foreignKey:'idMembresia'}) // Una membresia puede tener varios pagos asociados
// Pagos.belongsTo(Membresias, {foreignKey:'idMembresia' , as:'membresia'}) // Cada pago esta asociado a una sola membresia



// module.exports = {
//   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
//   conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
// };


require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, DATABASE } = process.env;

// Determina la URL de conexión según el entorno
const sequelize = new Sequelize(
  process.env.DATABASE_URL || `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DATABASE}`,
  {
    logging: false, // Desactiva los logs de Sequelize para mantener los logs limpios
    dialect: 'postgres', // Especifica el dialecto
    protocol: 'postgres', // Especifica el protocolo
    dialectOptions: process.env.DATABASE_URL
      ? { ssl: { require: true, rejectUnauthorized: false } } // SSL para Railway
      : {} // Sin SSL para local
  }
);

// Cargar modelos de forma dinámica
const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexión (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Definimos las relaciones
const { Usuarios, Pagos, Membresias } = sequelize.models;

Usuarios.hasMany(Pagos, { foreignKey: 'idUsuario' }); // Un usuario puede tener varios pagos asociados
Pagos.belongsTo(Usuarios, { foreignKey: 'idUsuario', as: 'usuario' }); // Cada pago está asociado a un solo usuario

Membresias.hasMany(Pagos, { foreignKey: 'idMembresia' }); // Una membresía puede tener varios pagos asociados
Pagos.belongsTo(Membresias, { foreignKey: 'idMembresia', as: 'membresia' }); // Cada pago está asociado a una sola membresía

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
};