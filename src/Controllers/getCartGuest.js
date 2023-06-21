const { CartGuestProducts, Product } = require('../db');

const getCartGuest = async (req, res) => {
  try {
    const { CartGuestId } = req.query;
    let cartGuestProducts;

    if (CartGuestId) {

    cartGuestProducts = await CartGuestProducts.findAll({
      where: { CartGuestId },
      include: {
        model: Product,
        attributes: ['id', 'nombre', 'precio', 'descripcion', 'imagenes', 'categoria', 'marca', 'ref' ], 
      },
    });
  } else {
    cartGuestProducts = []; 
  }

    res.status(200).json({ cartGuestProducts});
  } catch (error) {
    console.error('Error al obtener los CartProducts:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = getCartGuest;