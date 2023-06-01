const { Product } = require("../db")
const cloudinary = require("../utils/cloudinary");

const addProducts= async (req,res)=>{

    const { nombre, tipo, caracteristicas, categoria, imagen, precio, stock, marca, descripcion, ref, estado } = req.body;
        

    if(!nombre || !imagen || !precio || !marca || !ref) return res.status(404).json({message: "Faltan datos"})

    const proExist = await Product.findOne({where:{nombre, ref}});
    console.log(proExist);
    if(proExist) return res.status(400).json({message: "Producto ya existe"})
    

    try{
        const cloudinaryResponse = await cloudinary.uploader.upload(imagen, {
            folder: 'products' 
          });
          const imageUrl = cloudinaryResponse.secure_url;

    const newProduct = await Product.create({nombre, tipo, caracteristicas, categoria, imagen:imageUrl, precio, stock, marca, descripcion, ref, estado})
    

    res.status(200).json(newProduct)

    }catch(err){res.status(404).json({message: "Llegue al catch del post de productos "+ err.message})}





}

module.exports = addProducts;