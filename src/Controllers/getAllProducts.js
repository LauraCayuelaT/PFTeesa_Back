const { Product } = require("../db");
const { Op } = require('sequelize');

const getAllProducts = async(req,res)=>{

    try{

        const {nombre,tipo,estado,marca}=req.query
        let {precioMinimo,precioMaximo}=req.query
        
        const condiciones={}
        if(nombre){
            // condiciones.nombre = {
            //     [Op.iLike]: `%${nombre}%`
            //   };
            condiciones[Op.or] = [
                { nombre: { [Op.iLike]: `%${nombre}%` } },
                { descripcion: { [Op.iLike]: `%${nombre}%` } },
                { caracteristicas: { [Op.iLike]: `%${nombre}%` } }
            ];
        }
        if(tipo){
            condiciones.tipo = {
                [Op.iLike]: `%${tipo}%`
              };
        }
        if(precioMinimo&&precioMaximo){
            precioMinimo=Number(precioMinimo)
            precioMaximo=Number(precioMaximo)
            condiciones.precio = {
                [Op.between]: [precioMinimo, precioMaximo]
              };
        }
        if(estado){
            condiciones.estado = {
                [Op.iLike]: `%${estado}%`
              };
        }
        if(marca){
            condiciones.marca = {
                [Op.iLike]: `%${marca}%`
              };
        }
           
        
        const allProducts = await Product.findAll({
            where:condiciones
        });

        res.status(201).json(allProducts)
     

        
    }
    catch(err){res.status(404).json({message: "Catch de getAllProducts "+err.message})}
}

module.exports = getAllProducts