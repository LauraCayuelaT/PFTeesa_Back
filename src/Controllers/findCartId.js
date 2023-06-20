const {Cart} = require("../db")

const findCartId = async (req,res)=>{
    const {idUser} = req.params;
    console.log(idUser)
    try {
      const cartId = await Cart.findOne({where:{UserId:idUser}})
      res.status(202).json(cartId.id)
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  }

  module.exports = findCartId