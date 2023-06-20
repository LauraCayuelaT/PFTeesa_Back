const {Purchased} = require("../db")

const reviewUser = async (req,res,next)=>{
    const {userId} = req.params;
    const {ProductId} = req.body

  

    try {
        const existingUser = await Purchased.findOne({where:{
            UserId: userId,
            ProductId
        }})
        console.log(existingUser);

        if (existingUser !== null && existingUser !== undefined) {
            next();
          } else {
            res.status(400).json({ message: "Usuario no ha comprado este producto" });
          }

       
    } catch (error) {
        console.log("Estoy en el error del middleware")
        res.status(500).json({message:error.message})
    }

}

module.exports = reviewUser