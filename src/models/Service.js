const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Service', {
    id: {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha:{
      type:DataTypes.DATEONLY,
      allowNull:false
    }
  }, {timestamps: false});
};