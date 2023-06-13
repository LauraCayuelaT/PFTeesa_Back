const { Cart } = require("../db");
const createCart= async (req, res) => {
    try {
        const cart = await Cart.create();
        res.status(200).json({  cart })
    }catch (error) {
        res.status(404).json({ message: error.message });
      }}

module.exports = createCart;