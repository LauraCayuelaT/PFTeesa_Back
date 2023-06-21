const { CartGuestProducts, Product } = require('../db');

const getCartGuest = async (req, res) => {
  const {userId}=req.params
  try {
   
    const cartGuestProducts = await CartGuestProducts.findByPk({
      include: {
        model: Product,
        attributes: ['id', 'nombre', 'precio', 'descripcion', 'imagenes', 'categoria', 'marca', 'ref' ], 
      },
    });

    res.status(200).json({ cartGuestProducts});
  } catch (error) {
    console.error('Error al obtener los CartProducts:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = getCartGuest;