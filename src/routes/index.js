const { Router } = require("express");
const router = Router();
const addProducts = require("../Controllers/addProducts");
const getAllProducts = require("../Controllers/getAllProducts")
const getDetail= require ("../Controllers/getDetail")
const deleteProduct= require ("../Controllers/deleteProduct")
const updateProduct= require ("../Controllers/updateProduct")

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

module.exports = router;   