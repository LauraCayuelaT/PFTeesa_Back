const { CartGuestProducts, Product } = require('../db');

const updateCartGuest = async (req, res) => {
  try {
    const { cartGuestProductId } = req.params;
    const { cantidad } = req.body;

    // Verificar si el CartProduct existe
    const cartGuestProduct = await CartGuestProducts.findByPk(cartGuestProductId, 
      {
        include: {
          model: Product,
          attributes: ['id', 'nombre', 'precio', 'descripcion', 'imagenes', 'categoria', 'marca', 'ref' ], // Añade los atributos que deseas mostrar del producto
        },
      });



    if (!cartGuestProduct) {
      return res.status(404).json({ error: 'CartGuestProduct no encontrado' });
    }

    const { precio } = cartGuestProduct.Product;
    const total = precio * cantidad;

    // Actualizar la cantidad y el total del CartProduct
    cartGuestProduct.cantidad = cantidad;
    cartGuestProduct.precioTotal = total;
    await cartGuestProduct.save();

    res.status(200).json({ cartGuestProduct });
  } catch (error) {
    console.error('Error al modificar el CartProduct:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = updateCartGuest;