const { DataTypes } = require('sequelize');
const moment = require("moment")

module.exports = (sequelize) => {
  sequelize.define('Review', {
    comentario:{
        type: DataTypes.TEXT
    },
    estrellas:{
        type:DataTypes.INTEGER
    },
    fecha:{
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
   
  }, {timestamps: false});
};