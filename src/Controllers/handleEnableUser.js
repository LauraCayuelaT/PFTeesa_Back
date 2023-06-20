const { User } = require("../db");
const uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const handleEnableUser=async(req,res)=>{

        try {
            const {idUser}=req.params
            const {enable}=req.query
    
            if(!uuidRegExp.test(idUser)) return res.status(400).json({message: "Id invalido"}) //Validacion de uuid
    
            if(!enable   || !typeof enable === 'boolean'  ) return  res.status(400).json({message: "enable debe ser tipo boolean"})
    
            const user= await User.findOne({ where: { id: idUser } });
    
            if(user){
                user.enable= enable
                const updatedUser= await user.save();
                return res.status(200).json(updatedUser)
    
            }else{
                res.status(404).json({message:"Usuario no encontrado(id invalido)"})
            }
        } catch (error) {
            res.status(400).json({message:error.message})
        }
       
    }

module.exports=handleEnableUser;
