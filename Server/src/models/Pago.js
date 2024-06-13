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

        // type: DataTypes.UUID,
        // defaultValue: DataTypes.UUIDV4,
        // primaryKey: true,
        // allowNull: false,
      },

      idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios",
          key: "id",
        },
        

     
      },

      fechaDePago: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      cuota: {
        type: DataTypes.ENUM,
        values: ["3 meses", "mes","semana", "dia"],
        allowNull: false,
      },

      

      monto: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      metodoPago: {
        type: DataTypes.STRING,
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
    },
     {
       timestamps: false,
    }
  );
};
