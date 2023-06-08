const { Router } =require("express");
const googleRouter = Router();
const passport = require("passport")
const {User} = require("../db");



//SIGNUP

googleRouter.get("/signup", passport.authenticate("google-signup", {scope: ['email','profile']}))


googleRouter.get('/callback', (req, res, next) => {

  
      passport.authenticate('google-signup', { failureRedirect: 'https://pf-teesa-front.vercel.app/signup', failureFlash: true }, (err, user) => {
      if (err) {
        console.error('Error en la autenticación de Google:', err);
        return res.redirect('https://pf-teesa-front.vercel.app/signup');
      }
      if (!user) {
        req.session.errorMessage = 'Error en la autenticación de Google';
        return res.redirect('https://pf-teesa-front.vercel.app/signup');
      }
  
      const { displayName, emails, accessToken, refreshToken, id } = user;
      User.findOne({ where: { correo: emails[0].value } })
        .then(existingUser => {
          if (existingUser) {
            req.session.destroy();
            return res.redirect('https://pf-teesa-front.vercel.app/login'); //definir con el front que ruta vamos a mostrar para decirle al cliente que ya existe
          }
  
          User.create({ nombre: displayName, correo: emails[0].value, googleToken: accessToken, refreshToken, tipo: false })
            .then(newUser => {
              req.session.destroy();
              res.redirect('https://pf-teesa-front.vercel.app/login');
            })
            .catch(error => {
              console.error('Error al crear un nuevo usuario:', error);
              next();
            });
        })
        .catch(error => {
          console.error('Error al buscar un usuario existente:', error);
          next();
        });
    })(req, res, next);
    
  });

googleRouter.get('/api/getErrorMessage', (req, res) => {
    const errorMessage = req.session.errorMessage || '';
    req.session.errorMessage = ''; // Borra el mensaje después de enviarlo
  
    res.json({ errorMessage });
  });


//LOGIN

  // // MIDDLEWARE PARA COMPROBAR QUE EL USUARIO ESTA REGISTRADO

// const isSignedUp = async (req,res,next)=>{

//     if(req.user){
//         const userExist = await User.findOne({where: {correo: req.user.emails[0].value}})
//         if(userExist) return res.status(401).json({message: "Usuario ya registrado"})
//         next()
//     }
    
//     else {res.status(401).json({message: "Usuario no registrado"})}
// }

// router.get('/login', isSignedUp, (req,res)=>
// {
// res.status(201).json({message: "Registro Exitoso"})})



// //LOGOUT

// router.get('/logout', (req,res)=>{
//     req.logout(function(err) {
//         if (err) { console.log("Error al destruir la sesion: ",err )} 
//         res.redirect('/'); });

//     req.session.destroy()
//     ;
//     res.send('Adios')
// })


module.exports = googleRouter