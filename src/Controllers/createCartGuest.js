const { CartGuest, CartGuestProducts, Product } = require('../db');

const createCartGuest = async(req,res)=>{
    try {
        const { CartGuestId, ProductId, cantidad} = req.body;
        
    
        // Verificar si el carrito existe
        const cartGuest = await CartGuest.findByPk(CartGuestId);
        if (!cartGuest) {
          return res.status(404).json({ error: 'Carrito no encontrado' });
        }
    
        // Verificar si el producto existe
        const product = await Product.findByPk(ProductId);
        if (!product) {
          return res.status(404).json({ error: 'Producto no encontrado' });
        }
        const precioTotal = product.precio * cantidad;
        // Crear o actualizar el registro en la tabla CartProducts
        let cartGuestProduct = await CartGuestProducts.findOne({
          where: {
            CartGuestId,
            ProductId,
          },
        });
    
        if (cartGuestProduct) {
          // Si el producto ya está en el carrito, actualizar la cantidad
          cartGuestProduct.cantidad += cantidad;
          cartGuestProduct.precioTotal = product.precio * cartGuestProduct.cantidad;
          await cartGuestProduct.save();
        } else {
          // Si el producto no está en el carrito, crear un nuevo registro
          cartGuestProduct = await CartGuestProducts.create({
            CartGuestId,
            ProductId,
            cantidad,
            precioTotal
          });
        }
    
        res.status(200).json({ cartGuestProduct });
      } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
    
module.exports = createCartGuest