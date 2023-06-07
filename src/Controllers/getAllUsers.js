const { User } = require("../db");

const getAllUsers=async(req,res)=>{

    
    try {
        const allUsers= await User.findAll()
        res.status(200).json(allUsers)
        
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

module.exports=getAllUsers