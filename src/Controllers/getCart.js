const { CartProducts, Product } = require('../db');

const getCartProducts = async (req, res) => {
  try {
    const { CartId } = req.query;

    // Verificar si los CartProducts existen
    const cartProducts = await CartProducts.findAll({
      where: { CartId },
      include: {
        model: Product,
        attributes: ['id', 'nombre', 'precio', 'descripcion', 'imagenes', 'categoria', 'marca', 'ref' ], 
      },
    });

    if (!cartProducts.length) {
      return res.status(404).json({ error: 'No se encontraron CartProducts' });
    }

    res.status(200).json({ cartProducts});
  } catch (error) {
    console.error('Error al obtener los CartProducts:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = getCartProducts;