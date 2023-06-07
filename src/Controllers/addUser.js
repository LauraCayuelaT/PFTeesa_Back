const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,20}$/;  //1 Mayus,1 Num,1 car.esp, 6-20
const bcryptjs=require('bcryptjs')

const addUser=async(req,res)=>{

    try {
        const{correo,contrasena}= req.body
    
        if (!emailRegex.test(correo)) {
            return res.status(404).json({message:"Correo invalido"})
        }
        if (!passwordRegex.test(contrasena)) {
            return res.status(404).json({message:"Contraseña invalida"})
        }

        const contrasenaHash= await bcryptjs.hash(contrasena,8) //8 numero de saltos, mayor numero mas seguro pero mas lento
        return res.status(200).json({message:"OK",password:contrasenaHash})

    } catch (error) {
        res.status(404).json({message:error.message})
    }
    
}

module.exports=addUser