const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    caracteristicas: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    categoria:{
        type:DataTypes.STRING,
        allowNull:false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    precio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    stock:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {timestamps: false});
};