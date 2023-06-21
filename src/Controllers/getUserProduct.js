const {Purchased, Review} = require("../db")


const getUserProduct = async(req,res)=>{
    const {userId} = req.params;
    const {ProductId} = req.query;

    try {
        const existingUser = await Purchased.findOne({where:{
            UserId: userId,
            ProductId
        }})

        if(existingUser) {
            
            const userReview = await Review.findOne({where:{UserId: userId, ProductId}})

            if(userReview) return res.status(400).json({message: "Usuario ya realizó review"})
            
            return res.status(200).json({message: "Usuario con compra efectiva"})}

        res.status(400).json({message:"Usuario no ha comprado este producto"})
       
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = getUserProduct