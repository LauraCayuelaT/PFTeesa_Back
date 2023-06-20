///// SOLO PARA RPUEBAS EN EL BACK
const{ Cart }=require("../db")
const{ User }=require("../db")
const{ CartProducts }=require("../db")
const{ Product }=require("../db")

const uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const transformCart=(user)=>{

  return user.Cart.CartProducts.map( item=>{

          return{
              nombre:item.Product.nombre,
              precio:item.Product.precio,
              cantidad:item.cantidad,
              total:(item.cantidad)*item.Product.precio
              }
          })   
  }


const getCartProducts=async(req,res)=>{

    try {
        const {idUser}=req.params
        if(!uuidRegExp.test(idUser)) return res.status(400).json({message: "Id invalido"}) //Validacion de uuid
        
        const user = await User.findByPk(idUser, {
            // where:{id:idUser},
            attributes:[],
            include: {
              model: Cart,
              include: {
                model: CartProducts,
                include: {
                  model: Product,
                  attributes: ['nombre','precio'],
                },
                attributes: ['cantidad', 'ProductId'],
              },
            },
          });
        

        if(user){
            res.status(200).json( transformCart(user));
        }else{
            res.status(404).json({message:"no se encontro nada"})
        }
    } catch (error) {
        res.status(400).json({message:error.message})
    }
  
}

module.exports=getCartProducts