const { CartGuestProducts, Product } = require('../db');

const deleteCartGuest = async (req, res) => {
  try {
    const { cartGuestProductId } = req.params;

    // Verificar si el CartProduct existe
    const cartGuestProduct = await CartGuestProducts.findByPk(cartGuestProductId, {
      include: {
        model: Product,
        attributes: ['id', 'nombre', 'precio', 'descripcion', 'imagenes', 'categoria', 'marca', 'ref' ], // Añade los atributos que deseas mostrar del producto
      },
    });

    if (!cartGuestProduct) {
      return res.status(404).json({ error: 'CartProduct no encontrado' });
    }

    // Eliminar el CartProduct
    await cartGuestProduct.destroy();

    res.status(200).json({ message: 'CartProduct eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el CartProduct:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = deleteCartGuest;