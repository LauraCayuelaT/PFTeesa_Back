const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('CartProducts', {
    id: {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      defaultValue:1,
      allowNull: true,
    }
  }, {timestamps: false});
};