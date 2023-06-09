const bcryptjs=require('bcryptjs')

const { User } = require("../db");
const { Op } = require('sequelize');
const jwt= require('jsonwebtoken');
const secret=process.env.SECRET

const loginUser=async(req,res)=>{

    try {
    const{correo,contrasena}=req.body

    if(!correo || !contrasena) return res.status(400).json({message:"Faltan datos"})

    const usuario= await User.findOne({
        where:{correo:correo}
    })

    if(!usuario) return res.status(404).json({message:`El correo ${correo} no esta registrado`})

    const compare= await bcryptjs.compare(contrasena,usuario.contrasena)

    if(!compare) return res.status(404).json({message:`Credenciales invalidas`})

    const token=jwt.sign({
        sub:usuario.id,
        nombre:usuario.nombre,
        exp:Date.now()+60*1000,
        tipo:usuario.tipo
    },secret)

    return res.status(200).json({token})

    } catch (error) {
        res.status(404).json({message:error.message})
    }
//
    

}

module.exports=loginUser