const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Pagos",
    {
      idPago: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios",
          key: "id",
        },
      },
      idMembresia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Membresias",
          key: "id",
        },
      },
      fechaDePago: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      monto: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      estadoPago: {
        type: DataTypes.ENUM,
        values: ["pendiente", "pagado", "cancelado"],
        allowNull: false,
      },
      fechaDeVencimiento: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      tipoDePago: {
        type: DataTypes.ENUM,
        values: ["efectivo", "transferencia"],
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
