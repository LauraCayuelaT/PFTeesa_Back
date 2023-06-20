const {Review, User, Product} = require("../db");

const addReview = async (req,res)=>{
    
    const {userId} = req.params;

    const { ProductId, comentario, estrellas } = req.body;

    try{

        const newReview = await Review.create(
            {comentario, estrellas, UserId: userId, ProductId},
            {include: [{model:User},{model:Product}]}
            )
        res.status(202).json({message: "Review creada"})
    }
    catch(err) { 
        console.log("Estoy en el error del review");
        console.log(err)
        res.status(500).json({message:err.message})}


}


module.exports = addReview