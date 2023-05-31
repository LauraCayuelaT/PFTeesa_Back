const { Product } = require("../db");

const getAllProducts = async(req,res)=>{
    try{
        const allProducts = await Product.findAll();
        res.status(202).json(allProducts)
    }
    catch(err){res.status(404).json({message: "Catch de getAllProducts "+err.message})}
}

module.exports = getAllProducts