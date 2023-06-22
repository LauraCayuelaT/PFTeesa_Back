const {User} = require("../db")

const isAdmin = async (req,res,next)=>{

    const {id} = req.query;

    try {

        const admin = await User.findOne({where:{id}});

        if(admin){

            admin.tipo ? next() : res.status(400).json({message: "Usuario no autorizado"})
        }

       else {res.status(400).json({message: "Usuario no encontrado"})}
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

module.exports = isAdmin