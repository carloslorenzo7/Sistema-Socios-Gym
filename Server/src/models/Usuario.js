const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Usuarios",
    {
      id: {

        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,

      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
      email: {
        type: DataTypes.STRING,
        allowNull: false, // No permite valores nulos
        unique: true, // Hace que el campo sea único
        validate: {
          isEmail: true, // Valida que el valor sea una dirección de correo electrónico válida
        },
      },
      dni: {
        type: DataTypes.STRING,
        allowNull: false, // No permite valores nulos
        unique: true, // Hace que el campo sea único
      },

      estado:{
        type:DataTypes.ENUM,
        values:["activo", "vencido", "sin membresia"],
        defaultValue:"sin membresia",
        allowNull:false
      }
    },
    {
      timestamps: false,
    }
  );
};
