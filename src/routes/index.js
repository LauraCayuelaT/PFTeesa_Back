const { Router } = require("express");
const router = Router();
const addProducts = require("../Controllers/addProducts");
const getAllProducts = require("../Controllers/getAllProducts")
const getDetail= require ("../Controllers/getDetail")


// TRAE TODOS LOS PRODUCTOS DE LA BASE DE DATOS
router.get("/products", getAllProducts)

// TRAE LA INFORMACION DE UN PRODUCTO SEGUN ID
router.get("/detail/:idProduct",getDetail)

//AGREGA NUEVOS PRODUCTOS A LA BASE DE DATOSÍ
router.post("/products", addProducts)

module.exports = router;   