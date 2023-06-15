const { CartProducts, Product } = require('../db');

const updateCarts = async (req, res) => {
  try {
    const { cartProductId } = req.params;
    const { cantidad } = req.body;

    // Verificar si el CartProduct existe
    const cartProduct = await CartProducts.findByPk(cartProductId, 
      {
        include: {
          model: Product,
          attributes: ['id', 'nombre', 'precio', 'descripcion', 'imagenes', 'categoria', 'marca', 'ref' ], // Añade los atributos que deseas mostrar del producto
        },
      });


    if (!cartProduct) {
      return res.status(404).json({ error: 'CartProduct no encontrado' });
    }

    const { precio } = cartProduct.Product;
    const total = precio * cantidad;

    // Actualizar la cantidad y el total del CartProduct
    cartProduct.cantidad = cantidad;
    cartProduct.total = total;
    await cartProduct.save();

    res.status(200).json({ cartProduct });
  } catch (error) {
    console.error('Error al modificar el CartProduct:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = updateCarts;