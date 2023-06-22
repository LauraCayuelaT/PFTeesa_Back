const { Product } = require("../db")
const uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const cloudinary = require("../utils/cloudinary");

const updateProduct=async(req,res)=>{

    const {idProduct}=req.params
    if(!uuidRegExp.test(idProduct)) return res.status(400).json({message: "Id invalido"}) //Validacion de uuid

<<<<<<< HEAD
    const {  imagenes, precio, stock} = req.body;
=======
    const { imagenes, precio, stock } = req.body;
>>>>>>> 15cbd1a9431927c6706b674d6fca25e7c98022a4

    try {
        const uploadedImages = [];
        if(imagenes){

        for (const imagen of imagenes) {
         const cloudinaryResponse = await cloudinary.uploader.upload(imagen, {
         folder: 'products'
         });

        const imageUrl = cloudinaryResponse.secure_url;
        uploadedImages.push(imageUrl);
         }
        }

        const product= await Product.findOne({ where: { id: idProduct } });

        if(product){
<<<<<<< HEAD
            product.imagenes = imagenes? imagenes : product.imagenes;
            product.precio = precio? precio:product.precio;
            product.stock = stock? stock: product.stock;
            // product.nombre = nombre;
            // product.tipo = tipo;
            // product.caracteristicas = caracteristicas;
            // product.categoria = categoria;
            // product.imagenes = imagenes;
            // product.precio = precio;
            // product.stock = stock;
            // product.marca = marca;
            // product.descripcion = descripcion;
            // product.ref = ref;
            // product.estado = estado;
=======
            
            product.imagenes = imagenes? uploadedImages : product.imagenes;
            product.precio = precio? precio:product.precio;
            product.stock = stock? stock: product.stock;
            
>>>>>>> 15cbd1a9431927c6706b674d6fca25e7c98022a4
            const updatedProduct = await product.save();
            res.status(200).json(updatedProduct)
        }else{
            res.status(404).json({message:"Id no encontrado"})
        }
    } catch (error) {
            res.status(404).json({message:error.message})
    }
}

module.exports=updateProduct