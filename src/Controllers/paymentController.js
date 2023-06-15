const mercadopago= require("mercadopago");
const {Cart} = require("../db");
const {CartProducts} = require("../db");

const createOrder = async (req,res)=>{
    const {id} = req.params;


    mercadopago.configure({
        access_token: "TEST-506669402188981-061413-d4d1537702f9ee8b568253de5e4b879f-1399136636"
    })

    // MANDAR POR GOOGLE ID
    // Manden por req.params id Usuario
    // id Usuario -> id Carrito que le corresponde
    // Cart Productos traigo todos los productos y cantidades sumar el total de precio de todos los productos

    let precioTotal = 0;
    const carrito = await Cart.findOne({where:{UserId: id}});
    const products = await CartProducts.findAll({where:{CartId:carrito.dataValues.id}, attributes: ['precioTotal']})
    products.map(prod=>precioTotal += prod.dataValues.precioTotal)

    



    const result = await mercadopago.preferences.create({
        
        items: [{
            title: 'Teesa',
            unit_price: Number(precioTotal),
            quantity:1,
            currency_id: "COP"

        }],
        back_urls: {
            success: "http://localhost:3001/mercadopago/success",
            failure: "http://localhost:3001/mercadopago/failure",
            pending: "http://localhost:3001/mercadopago/pending"
        },
        notification_url: "https://9010-2800-484-e882-90e4-90d2-8986-317b-11aa.ngrok.io/mercadopago/webhook"
    })

    

    res.send(result.body)

};


module.exports = createOrder