const { Router } =require("express");
const googleLoginRouter = Router();
const {User} = require("../db")
const passport = require("passport");
const googleRouter = require("./google");





googleLoginRouter.get("/login", passport.authenticate("google-login", {scope: ['email','profile']}))

// googleLoginRouter.get('/callback', passport.authenticate('google-login', { failureRedirect: 'https://pf-teesa-front.vercel.app/login', failureFlash: true }),async (req,res,next)=>{
//   if (req.authError) {
//     req.flash('error', req.authError);
//     return res.redirect('https://pf-teesa-front.vercel.app/login');
//   }

//   const { emails } = req.user;

//   const existingUser = User.findOne({ where: { correo: emails[0].value } });
//   try{
//   if(existingUser!==null){
      
    


//     req.login(existingUser, err => {
//       if (err) {
//         console.error('Error al iniciar sesión:', err);
//         return next(err);
//       }
//       // return res.redirect("https://pf-teesa-front.vercel.app/home");
//       return res.redirect("/")  
//     });
//     } else {
//     // Usuario no existente, redirigir a la página de registro o mostrar un mensaje de error
//     req.flash('error', 'Usuario no registrado');
//     return res.redirect('https://pf-teesa-front.vercel.app/signup');
//     }

//   }
//   catch(err){console.error('Error al buscar un usuario existente:', err);
//                 return next(err)}

// })

googleRouter.get('/callback', (req, res, next) => {

  
  passport.authenticate('google-login', { failureRedirect: 'https://pf-teesa-front.vercel.app/login', failureFlash: true }, (err, user) => {
  if (err) {
    console.error('Error en la autenticación de Google:', err);
    return res.redirect('https://pf-teesa-front.vercel.app/login');
  }
  if (!user) {
    req.session.errorMessage = 'Error en la autenticación de Google';
    return res.redirect('https://pf-teesa-front.vercel.app/login');
  }

  const { emails } = user;
  User.findOne({ where: { correo: emails[0].value } })
    .then(existingUser => {
      if (existingUser) {
        const nombre = existingUser.nombre;
        req.flash('username', nombre )
        return res.redirect('https://pf-teesa-front.vercel.app/home'); //definir con el front que ruta vamos a mostrar para decirle al cliente que ya existe
      }
      else {return res.redirect("https://pf-teesa-front.vercel.app/signup")}
    })
    .catch(error => {
      console.error('Error al buscar un usuario existente:', error);
      next();
    });
})(req, res, next);

});


  googleLoginRouter.get('/perfil',(req,res)=>{
    const userName = req.flash('username')[0];
    res.json(userName);
  })


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