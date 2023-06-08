const { Router } =require("express");
const googleLoginRouter = Router();
const {User} = require("../db")
const passport = require("passport");





googleLoginRouter.get("/login", passport.authenticate("google-login", {scope: ['email','profile']}))

googleLoginRouter.get('/callback', (req, res, next) => {
    passport.authenticate('google-login', { failureRedirect: 'https://pf-teesa-front.vercel.app/login', failureFlash: true }, (err, user) => {
    
    if (err) {
        console.error('Error en la autenticación de Google:', err);
        return res.redirect('https://pf-teesa-front.vercel.app/login');
      }
      if (!user) {
        req.session.errorMessage = 'Error en la autenticación de Google';
        return res.redirect('https://pf-teesa-front.vercel.app/login');
      }
  
      const { emails} = user;
      console.log(emails[0].value)
      User.findOne({ where: { correo: emails[0].value } })
        .then(existingUser => {
          
          if (existingUser!==null) {
            return res.redirect('https://pf-teesa-front.vercel.app/home'); 
          }
          else{
            req.session.errorMessage = "Usuario no registrado"
            req.session.destroy();
            res.redirect('https://pf-teesa-front.vercel.app/signup')
          }
         
        })
        .catch(error => {
          console.error('Error al buscar un usuario existente:', error);
          next();
        });
    })(req, res, next);
  });

  googleLoginRouter.get('/api/getErrorMessage', (req, res) => {
    const errorMessage = req.session.errorMessage || '';
    req.session.errorMessage = ''; // Borra el mensaje después de enviarlo
  
    res.json({ errorMessage });
  });





// //LOGOUT

// router.get('/logout', (req,res)=>{
//     req.logout(function(err) {
//         if (err) { console.log("Error al destruir la sesion: ",err )} 
//         res.redirect('/'); });

//     req.session.destroy()
//     ;
//     res.send('Adios')
// })


module.exports = googleLoginRouter;