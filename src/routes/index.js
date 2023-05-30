const { Router } = require("express");
const router = Router();
const addProducts = require("../Controllers/addProducts");
const getAllProducts = require("../Controllers/getAllProducts")

// TRAE TODOS LOS PRODUCTOS DE LA BASE DE DATOS
router.get("/products", getAllProducts)

//AGREGA NUEVOS PRODUCTOS A LA BASE DE DATOSÍ
router.post("/products", addProducts)

module.exports = router;   