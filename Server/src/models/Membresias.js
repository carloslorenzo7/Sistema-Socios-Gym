const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Membresias",
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
        unique: true,
      },

      descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      duracion: {
        type: DataTypes.INTEGER, //duracion en dias
        allowNull: false,
      },
      precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
