require('dotenv').config();
const { Sequelize } = require('sequelize');
const UserModel=require("./models/User")
const ServiceModel=require("./models/Service")
const CartModel=require("./models/Cart")
const ProductModel=require("./models/Product")
const PurchasedModel=require("./models/Purchased")
const PurchasedProductModel=require("./models/PurchasedProduct")

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/tessa`,
   {
      logging: false, 
      native: false, 
   }
)

UserModel(sequelize);
ProductModel(sequelize);
CartModel(sequelize);
ServiceModel(sequelize)
PurchasedModel(sequelize)
PurchasedProductModel(sequelize)

const { User, Cart, Product, Service, Purchased, PurchasedProduct } = sequelize.models;
User.hasMany(Cart)
User.hasMany(Cart)
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


module.exports = {
    sequelize
}