
const {Review, User, Product} = require("../db");



const getReviews = async (req,res)=>{
    const {productId} = req.params;

    try {   
            const reviews = await Review.findAll(
                {
                where:{ProductId:productId} ,
                include: [
                    {
                        model: User,
                        attributes: ['nombre']
                    }
                ]}
                );
            
            //Numero de ususarios que han hecho reviews
            const users = await Review.count({
                col: 'UserId',
                distinct: true,
                where:{
                    ProductId: productId
                }

            })

            //Total estrellas
            const totalStars = await Review.sum('estrellas',
            {
                where: {
                    ProductId: productId
                }
            }
            )

            //Promedio estrellas
            const avgStars = Math.floor(totalStars/users)

            console.log(avgStars)

            res.status(202).json({reviews,avgStars, users})
            
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = getReviews