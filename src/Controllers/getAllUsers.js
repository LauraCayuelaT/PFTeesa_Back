const { User, Cart } = require("../db");

const getAllUsers=async(req,res)=>{

    
    try {

      const allUsers = await User.findAll({
        include: {
          model: Cart,
        },
      });
  
      for (const user of allUsers) {
        if (!user.Cart) {
          const cart = await Cart.create();
          await cart.setUser(user);
          user.Cart = cart;
        }
      }
  
      res.status(200).json(allUsers);
        
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

module.exports=getAllUsers