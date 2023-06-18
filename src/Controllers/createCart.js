const { CartGuest } = require("../db");
const createCart= async (req, res) => {
    try {
        const cartGuest = await CartGuest.create();
        res.status(200).json({  cartGuest })
    }catch (error) {
        res.status(404).json({ message: error.message });
      }}

module.exports = createCart;