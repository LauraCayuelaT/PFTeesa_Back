const {User} = require("../db")
const uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isAdmin = async (req,res,next)=>{

    const {id} = req.query;

    if(!id || !uuidRegExp.test(id)) return res.status(400).json({message: "Falta id admin"}) //Validacion de uuid


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