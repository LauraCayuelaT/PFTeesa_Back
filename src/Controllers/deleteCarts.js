const { CartProducts, Product } = require('../db');

const deleteCarts = async (req, res) => {
  try {
    const { cartProductId } = req.params;

    // Verificar si el CartProduct existe
    const cartProduct = await CartProducts.findByPk(cartProductId, {
      include: {
        model: Product,
        attributes: ['id', 'nombre', 'precio', 'descripcion', 'imagenes', 'categoria', 'marca', 'ref' ], // Añade los atributos que deseas mostrar del producto
      },
    });

    if (!cartProduct) {
      return res.status(404).json({ error: 'CartProduct no encontrado' });
    }

    // Eliminar el CartProduct
    await cartProduct.destroy();

    res.status(200).json({ message: 'CartProduct eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el CartProduct:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = deleteCarts;