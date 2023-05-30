const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Purchased', {
    id: {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
  
    precioTotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {timestamps: false});
};