const { CartGuestProducts, Product } = require('../db');

const createCartGuest = async (req, res) => {
  try {
    const { ProductId, cantidad } = req.body;

    const product = await Product.findByPk(ProductId);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const precioTotal = product.precio * cantidad;

    const [cartGuestProduct, created] = await CartGuestProducts.findOrCreate({
      where: { ProductId },
      defaults: { cantidad, precioTotal },
    });

    if (!created) {
      // Si el producto ya está en el carrito, actualizar la cantidad
      cartGuestProduct.cantidad += cantidad;
      cartGuestProduct.precioTotal = product.precio * cartGuestProduct.cantidad;
      await cartGuestProduct.save();
    }

    res.status(200).json({ cartGuestProduct });
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = createCartGuest;