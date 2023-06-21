const { Product } = require("../db")
const uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const updateProduct=async(req,res)=>{

    const {idProduct}=req.params
    if(!uuidRegExp.test(idProduct)) return res.status(400).json({message: "Id invalido"}) //Validacion de uuid

    const { nombre, tipo, caracteristicas, categoria, imagenes, precio, stock, marca, descripcion, ref, estado } = req.body;

    try {
        const product= await Product.findOne({ where: { id: idProduct } });

        if(product){
            product.nombre = nombre;
            product.tipo = tipo;
            product.caracteristicas = caracteristicas;
            product.categoria = categoria;
            product.imagenes = imagenes;
            product.precio = precio;
            product.stock = stock;
            product.marca = marca;
            product.descripcion = descripcion;
            product.ref = ref;
            product.estado = estado;
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