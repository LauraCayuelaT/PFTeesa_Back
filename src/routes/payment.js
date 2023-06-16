const { Router } = require ("express");
const mercadopago = require("mercadopago");
const paymentRouter = Router();
const createOrder = require("../Controllers/paymentController");
const {CartProducts, Cart, User, Product, Purchased}= require("../db");


paymentRouter.post('/create_order/:id', createOrder)

paymentRouter.get('/checkoutsuccess',async (req,res)=>{
    const { user, precioTotal, merchant_order_id, carrito } =req.query;

    const productos = await CartProducts.findAll({where:{CartId:carrito},raw:true});
   


    // productos.map(  async (prod)=>{
    //     await Purchased.create({idCompra: merchant_order_id, UserId: user, idProducto: prod.ProductId, precio: prod.precioTotal, cantidad: prod.cantidad  },{include: [User]})
    // })

   

    res.redirect("https://pf-teesa-front.vercel.app/checkoutsuccess")
})

// paymentRouter.post('/webhook', async (req,res)=>{
    
//     const payment = req.query;
    

//     try {
//     if(payment.type === 'payment'){
//         const data = await mercadopago.payment.findById(payment['data.id']);
//         // console.log(data.body)
//         // console.log(data.body.order.id)

//         // console.log(data.body.transaction_amount)
//         // Aqui se puede guardar en base de datos. Guardar en base de datos Purchased. Modificar el modelo con order id, total precio y estado de pedido
//     }

//     res.sendStatus(204)}
//     catch(err){ res.sendStatus(500).json({error:err.message})}
// })


module.exports = paymentRouter;