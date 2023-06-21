
const isAuthenticated = async (req, res, next) => {
  try {
    // Verificar si el usuario está autenticado
    if (req.isAuthenticated()) {
      // El usuario está autenticado, se permite el acceso a las rutas protegidas
      return next();
    }

    // El usuario no está autenticado, se redirige a la página de inicio de sesión o se envía una respuesta de acceso no autorizado
    res.status(401).json({ message: "Acceso no autorizado" });// O res.status(401).json({ message: "Acceso no autorizado" });
  } catch (error) {
    console.log("Error en el middleware:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = isAuthenticated;
