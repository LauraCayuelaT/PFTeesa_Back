const {Purchased} = require("../db")

const getAllPurchases = async(req,res)=>{
    const {id} = req.params;

    try{

        const compras = await Purchased.findAll({where:{UserId:id}})
        if(compras) return res.status(202).json(compras)
        res.status(400).json({mensaje: "No hay compras de ese usuario"})

    }
    catch(err){ res.status(500).json({mensaje: err.message})

    }
}

module.exports = getAllPurchases