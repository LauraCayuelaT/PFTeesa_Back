

const loginCheck=async(req,res)=>{
    return res.status(200).json({message:"Usuario autorizado"})
}

module.exports=loginCheck