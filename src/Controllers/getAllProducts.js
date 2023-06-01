const { Product } = require("../db");
const { Op } = require('sequelize');

const getAllProducts = async(req,res)=>{

    try{

        const {nombre}=req.query
        if(nombre){
            const searchProduct= await Product.findAll( //Busco recipes en la base de datos que contengan el name
            {where:
                {nombre:{
                    [Op.iLike]: `%${nombre}%`  //Ilike no es case sensitive
                     }
                }               
            })
            res.status(201).json(searchProduct)
        }else{
            const allProducts = await Product.findAll();
            res.status(201).json(allProducts)
        }

        
    }
    catch(err){res.status(404).json({message: "Catch de getAllProducts "+err.message})}
}

module.exports = getAllProducts