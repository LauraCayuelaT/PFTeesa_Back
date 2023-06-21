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
const deleteCarts=require("../Controllers/deleteCarts")
const updateCarts=require("../Controllers/updateCarts")
const createCartGuest=require("../Controllers/createCartGuest")
const getCart = require("../Controllers/getCart")
const getCartGuest = require("../Controllers/getCartGuest")
const updateCartGuest = require("../Controllers/updateCartGuest")
const deleteCartGuest = require("../Controllers/deleteCartGuest")
const addCarts = require("../Controllers/addCarts")
const updateUser=require("../Controllers/updateUser")

const getCartProducts=require("../Controllers/getCartProducts")

const loginCheck=require ("../Controllers/loginCheck")
const tokenCheck=require("./tokenCheck")

const session = require("express-session");
const passport = require("passport");
const flash = require("express-flash");
const paymentRouter = require("./payment");
const getAllPurchases = require("../Controllers/getAllPurchases");



require("../auth")

router.use(flash())         
router.use(session({
      secret: 'proyectoTeesa',
      resave: false,
      saveUninitialized: false
}));;
router.use(passport.initialize());
router.use(passport.session());


const authenticate = (req, res, next) => {
  // Aquí puedes agregar tu lógica de autenticación para usuarios registrados
  // Por ejemplo, verificar si existe un usuario logeado
  // Si el usuario no está autenticado, puedes redirigirlo a la página de inicio de sesión o enviar una respuesta de error.
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

// Middleware para verificar si el usuario es un invitado (no registrado)
const checkGuest = (req, res, next) => {
  // Aquí puedes agregar tu lógica para verificar si el usuario es un invitado
  // Por ejemplo, puedes verificar si no existe un usuario logeado o si se encuentra en un estado de invitado.
  if (req.user) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

 

// TRAE TODOS LOS PRODUCTOS DE LA BASE DE DATOS
router.get("/products", getAllProducts)

// TRAE LA INFORMACION DE UN PRODUCTO SEGUN ID
router.get("/detail/:idProduct",getDetail)

//AGREGA NUEVOS PRODUCTOS A LA BASE DE DATOS
// Protección requerida tipo usuario solo ADMIN
router.post("/products", addProducts)

//ELIMINA UN PRODUCTO SEGUN SU ID
// Protección requerida tipo usuario solo ADMIN
router.delete("/products/:idProduct",deleteProduct)

//MODIFICA LOS VALORES DE UN PRODUCTO GUARDADO
// Protección requerida tipo usuario solo ADMIN
router.put("/detail/:idProduct",updateProduct)

//TRAE TODAS LAS MARCAS 
router.get("/brands", getBrands)

//CREAR UN USUARIO
router.post("/signup",addUser)

//MODIFICA LOS DATOS DE UN USUARIO
router.put("/user/:idUser",updateUser)


//lOGEAR USUARIO
router.post("/login",loginUser)

//Traer todos los usuarios
// Protección requerida tipo usuario solo ADMIN
router.get("/users",getAllUsers)

//Routa protegida para pruebas del token
router.get("/loginCheck",tokenCheck,loginCheck)

// SIGN UP GOOGLE


router.use("/google", googleRouter);

//LOGIN

router.use("/auth/google", googleLoginRouter);

//crea un cart, es para que un usuario sin registrarse tenga un CartId 

router.post("/cartGuestProducts", createCartGuest)

router.get("/cartGuestProducts", getCartGuest)

router.delete("/cartGuestProducts/:cartGuestProductId", deleteCartGuest)

router.put("/cartGuestProducts/:cartGuestProductId", updateCartGuest)

//agrega a un cart la informacion del producto, pasando por body ProductId, CartId y cantidad de ese producto
//Proteger si el existe usuario logeado
router.post("/cart", addCarts)

//obtiene un cart por usuario con query cartId
//Proteger si el existe usuario logeado
router.get("/cart", getCart)

//borra un cart por params cartProductId
//Proteger si el existe usuario logeado
router.delete("/cart/:cartProductId", deleteCarts)

//modifica un cart por params cartProductId
//Proteger si el existe usuario logeado
router.put("/cart/:cartProductId", updateCarts)



///////////////SOLO PARA PRUEBAS EN EL BACK////////////////////
router.get("/cart_products/:idUser", getCartProducts)

// MERCADO PAGO

router.use("/mercadopago", paymentRouter)

//Traer todas las compras del usuario

router.get("/purchase/:id", getAllPurchases)





module.exports = router;




