const {Purchase} = require("../db")

const updatePurchase = async(req,res)=>{

    const { id, estado } =req.params;

    try{

        const compra = await Purchase.findOne({where:{id}});

        compra.estado = estado

        await compra.save();

        res.status(200).json({message: "Compra actualizada correctamente"})

    }
    catch(err){
        res.status(500).json({message: err.message})
    }

}

module.exports = updatePurchase