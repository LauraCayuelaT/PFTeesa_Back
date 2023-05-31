const { Product } = require("../db")
const uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const getDetail=async(req,res)=>{

    const {idProduct}=req.params
    if(!uuidRegExp.test(idProduct)) return res.status(400).json({message: "Id invalido"}) //Validacion de uuid

    try {
        const product= await Product.findByPk(idProduct)
    
        if(product){
            res.status(200).json(product)
        }else{
            res.status(404).json({message:"Id no encontrado"})
        }
    } catch (error) {
        res.status(404).json({message:error.message})
    }
    
}

module.exports= getDetail