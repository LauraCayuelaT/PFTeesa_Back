const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,20}$/;  //1 Mayus,1 Num,1 car.esp, 6-20
const bcryptjs=require('bcryptjs')

const { User, Cart } = require("../db");
const { Op } = require('sequelize');

const addUser=async(req,res)=>{

    try {
        let{nombre,direccion,telefono,nit,correo,contrasena,tipo=false, enable=true}= req.body
    
        if (!emailRegex.test(correo)) {
            return res.status(404).json({message:"Correo invalido"})
        }
        if (!passwordRegex.test(contrasena)) {
            return res.status(404).json({message:"Contraseña invalida"})
        }

        const contrasenaHash= await bcryptjs.hash(contrasena,8) //8 numero de saltos, mayor numero mas seguro pero mas lento

        if(!direccion) direccion="";
        if(!telefono) telefono="";
        if(!nit) nit=0;
        

        const [usuario,creado]= await User.findOrCreate({
            where:{
                [Op.or]:[{correo}]
            },
            defaults:{
                nombre,direccion,telefono,nit,correo,contrasena:contrasenaHash,tipo,enable
            }
        })
        if(creado){
            const cart = await Cart.create();
            await cart.setUser(usuario); //pronto se crea el usuario se crea una cart asignado al mismo
            return res.status(200).json({usuario, cart})
        }else{
            return res.status(400).json({message:"Ya existe un usario con ese correo"})
        }

        

    } catch (error) {
        res.status(404).json({message:error.message})
    }
    
}

module.exports=addUser