const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Purchased', {
    id: {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false  
    },
  
    idCompra: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: false
    },
    precio:{
      type: DataTypes.INTEGER
    },
    estado:{
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue: 'Pagado'
    },
    cantidad:{
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue:1
    },
    fechaDeCompra:{
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }

  }, {timestamps: false});
};
