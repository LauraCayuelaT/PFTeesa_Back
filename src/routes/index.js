const { Router } = require("express");
const router = Router();
const addProducts = require("../Controllers/addProducts");
const getAllProducts = require("../Controllers/getAllProducts")
const getDetail= require ("../Controllers/getDetail")
const deleteProduct= require ("../Controllers/deleteProduct")
const updateProduct= require ("../Controllers/updateProduct")
const getBrands=require("../Controllers/getBrands")
const addUser=require("../Controllers/addUser")
const getAllUsers=require("../Controllers/getAllUsers")

// TRAE TODOS LOS PRODUCTOS DE LA BASE DE DATOS
router.get("/products", getAllProducts)

// TRAE LA INFORMACION DE UN PRODUCTO SEGUN ID
router.get("/detail/:idProduct",getDetail)

//AGREGA NUEVOS PRODUCTOS A LA BASE DE DATOS
router.post("/products", addProducts)

//ELIMINA UN PRODUCTO SEGUN SU ID
router.delete("/products/:idProduct",deleteProduct)

//MODIFICA LOS VALORES DE UN PRODUCTO GUARDADO
router.put("/detail/:idProduct",updateProduct)

//TRAE TODAS LAS MARCAS 
router.get("/brands", getBrands)

//CREAR UN USUARIO
router.post("/user",addUser)

//Traer todos los usuarios
router.get("/users",getAllUsers)

module.exports = router;   