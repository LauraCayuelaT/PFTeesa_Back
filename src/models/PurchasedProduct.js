const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('PurchasedProduct', {
    id: {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {timestamps: false});
};