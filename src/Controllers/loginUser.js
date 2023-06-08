const bcryptjs=require('bcryptjs')

const { User } = require("../db");
const { Op } = require('sequelize');

const loginUser=async(req,res)=>{

    const{correo,contrasena}=req.body

    if(!correo || !contrasena) return res.status(400).json({message:"Faltan datos"})

    const usuario= await User.findOne({
        where:{correo:correo}
    })

    if(!usuario) return res.status(404).json({message:`El correo ${correo} no esta registrado`})

    const compare= await bcryptjs.compare(contrasena,usuario.contrasena)

    if(!compare) return res.status(404).json({message:`Credenciales invalidas`})

    return res.status(200).json({message:"Logeo exitoso"})

}

module.exports=loginUser