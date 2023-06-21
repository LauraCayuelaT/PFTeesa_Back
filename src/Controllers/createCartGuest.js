const { CartGuestProducts, Product } = require('../db');

const createCartGuest = async(req,res)=>{
    try {
        const { ProductId, cantidad} = req.body;
        
        const product = await Product.findByPk(ProductId);
        if (!product) {
          return res.status(404).json({ error: 'Producto no encontrado' });
        }
        const precioTotal = product.precio * cantidad;
        let cartGuestProduct = await CartGuestProducts.findOne({
          where: {
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