const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Review', {
    comentario:{
        type: DataTypes.TEXT
    },
    estrellas:{
        type:DataTypes.INTEGER
    }
   
  }, {timestamps: false});
};