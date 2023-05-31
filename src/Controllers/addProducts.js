const { Product } = require("../db")


const addProducts= async (req,res)=>{

    const { nombre, tipo, caracteristicas, categoria, imagen, precio, stock, marca, descripcion, ref } = req.body;
        

    if(!nombre || !imagen || !precio || !marca || !ref) return res.status(404).json({message: "Faltan datos"})

    const proExist = await Product.findOne({where:{nombre, ref}});
    if(proExist) return res.status(400).json({message: "Producto ya existe"})
    

    try{

    const newProduct = await Product.create({nombre, tipo, caracteristicas, categoria, imagen, precio, stock, marca, descripcion, ref})
    

    res.status(202).json(newProduct)

    }catch(err){res.status(404).json({message: "Llegue al catch del post de productos "+ err.message})}





}

module.exports = addProducts;