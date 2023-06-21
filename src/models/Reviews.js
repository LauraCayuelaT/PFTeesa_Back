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
      defaultValue: moment().format("YYYY-MM-DD")
    }
   
  }, {timestamps: false});
};