const { Cart, CartProducts, Product } = require('../db');

const addCarts = async(req,res)=>{
    try {
        const { CartId, ProductId, cantidad} = req.body;
    
        // Verificar si el carrito existe
        const cart = await Cart.findByPk(CartId);
        if (!cart) {
          return res.status(404).json({ error: 'Carrito no encontrado' });
        }
    
        // Verificar si el producto existe
        const product = await Product.findByPk(ProductId);
        if (!product) {
          return res.status(404).json({ error: 'Producto no encontrado' });
        }
    
        // Crear o actualizar el registro en la tabla CartProducts
        let cartProduct = await CartProducts.findOne({
          where: {
            CartId,
            ProductId,
          },
        });
    
        if (cartProduct) {
          // Si el producto ya está en el carrito, actualizar la cantidad
          cartProduct.cantidad += cantidad;
          await cartProduct.save();
        } else {
          // Si el producto no está en el carrito, crear un nuevo registro
          cartProduct = await CartProducts.create({
            CartId,
            ProductId,
            cantidad,
          });
        }
    
        res.status(200).json({ cartProduct });
      } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
    
module.exports = addCarts