require('dotenv').config();
const { Sequelize } = require('sequelize');
const UserModel=require("./models/User")
const ServiceModel=require("./models/Service")
const CartModel=require("./models/Cart")
const ProductModel=require("./models/Product")
const PurchasedModel=require("./models/Purchased")
const PurchasedProductModel=require("./models/PurchasedProduct")
const ReviewModel = require('./models/Reviews')

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY, BD, DB_DEPLOYRAIL } = process.env;
// PARA DEPLOY CON RENDER
// const sequelize = new Sequelize(
//    DB_DEPLOY,
//    {
//       logging: false, 
//       native: false, 
//       dialectOptions: {
//          ssl: {
//             require: true
//          }
//       }
//    }
// )

// PARA DEPLOY CON RAILWAY
const sequelize = new Sequelize(
   DB_DEPLOYRAIL,
   {
      logging: false, 
      native: false, 
      
   }
)

// const sequelize = new Sequelize(
//    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${BD}`,
//    {
//       logging: false, 
//       native: false
//    }
// )

UserModel(sequelize);
ProductModel(sequelize);
CartModel(sequelize);
ServiceModel(sequelize)
PurchasedModel(sequelize)
PurchasedProductModel(sequelize)
ReviewModel(sequelize)

const { User, Cart, Product, Service, Purchased, PurchasedProduct, Review } = sequelize.models;
User.hasMany(Cart)
User.hasMany(Service)
User.hasMany(Purchased)
Product.hasMany(Cart)
Product.hasMany(PurchasedProduct)
Cart.belongsTo(User)
Service.belongsTo(User)
Purchased.belongsTo(User)
Purchased.hasMany(PurchasedProduct)
PurchasedProduct.belongsTo(Purchased)
Cart.belongsTo(Product)
PurchasedProduct.belongsTo(Product)
User.belongsToMany(Product, {through: Review});
Product.belongsToMany(User, {through: Review});
Review.belongsTo(User);


module.exports = {
    sequelize, ...sequelize.models
}