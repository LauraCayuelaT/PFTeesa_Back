const { Router } = require ("express");
const mercadopago = require("mercadopago");
const paymentRouter = Router();
const createOrder = require("../Controllers/paymentController")


paymentRouter.post('/create_order/:id', createOrder)
paymentRouter.get('/success', (req,res)=>{
    res.send("Success")
})
paymentRouter.get('/failure', (req,res)=>{
    res.send("Failed")
})
paymentRouter.get('/pending', (req,res)=>{
    res.send("Pending")
})
paymentRouter.post('/webhook', async (req,res)=>{
    
    const payment = req.query;

    try {
    if(payment.type === 'payment'){
        const data = await mercadopago.payment.findById(payment['data.id']);
        console.log(data)
        // Aqui se puede guardar en base de datos
    }

    res.sendStatus(204)}
    catch(err){ res.sendStatus(500).json({error:err.message})}
})


module.exports = paymentRouter;