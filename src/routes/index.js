const { Router } = require("express");
const router = Router();
const addProducts = require("../Controllers/addProducts");
const getAllProducts = require("../Controllers/getAllProducts");
const getDetail= require ("../Controllers/getDetail");
const deleteProduct= require ("../Controllers/deleteProduct");
const updateProduct= require ("../Controllers/updateProduct");
const getBrands=require("../Controllers/getBrands");
const googleRouter = require("./google");
const googleLoginRouter = require("./googleLoginRouter")
const addUser=require("../Controllers/addUser");
const getAllUsers=require("../Controllers/getAllUsers");
const loginUser=require("../Controllers/loginUser");

const loginCheck=require ("../Controllers/loginCheck")
const tokenCheck=require("./tokenCheck")

const session = require("express-session");
const passport = require("passport");
const flash = require("express-flash");
require("../auth")

router.use(flash())         
router.use(session({
      secret: 'proyectoTeesa',
      resave: false,
      saveUninitialized: false
    }));;
router.use(passport.initialize());
router.use(passport.session());
 

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
router.post("/singup",addUser)

//lOGEAR USUARIO
router.get("/login",loginUser)

//Traer todos los usuarios
router.get("/users",getAllUsers)

//Routa protegida para pruebas del token
router.get("/loginCheck",tokenCheck,loginCheck)

// SIGN UP GOOGLE


router.use("/google", googleRouter);

//LOGIN

router.use("/auth/google", googleLoginRouter);






module.exports = router;




