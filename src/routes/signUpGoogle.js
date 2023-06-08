const { Router } =require("express");
const signUpGoogleRouter = Router();
require('../auth')
const session = require("express-session");
const passport = require("passport");
const flash = require("express-flash");
const {User} = require("../db");

signUpGoogleRouter.use(flash())         
signUpGoogleRouter.use(session({
      secret: 'proyectoTeesa',
      resave: false,
      saveUninitialized: false
    }));;
signUpGoogleRouter.use(passport.initialize());
signUpGoogleRouter.use(passport.session());



signUpGoogleRouter.get("/signup", passport.authenticate("google", {scope: ['email','profile']}))
      
// signUpGoogleRouter.get('/callback', passport.authenticate('google',{
//     successRedirect: 'https://pf-teesa-front.vercel.app/login',
//     failureRedirect: 'https://pf-teesa-front.vercel.app/signup',
//     failureFlash:true
// })
// , (req,res,next)=>{
//         const { displayName, emails, accessToken, refreshToken, id } = req.user;
//         User.findOne({where:{correo: emails[0].value}})
//         .then(existingUser=>{
//             if(existingUser){
//                 req.session.errorMessage= 'El usuario ya esta registrado'
//                 res.redirect('https://pf-teesa-front.vercel.app/login')
//             }
//             else{
//                 User.create({nombre:displayName, correo: emails[0].value, contrasena: id, googleToken: accessToken, refreshToken, tipo:false})
//                 .then(newUser=>{    
//                     next()
//                 })
//                 .catch(error => {
//                     console.error('Error al crear un nuevo usuario:', error);
//                     next();
//                   });
//             }
//         })
//         .catch(error => {
//             console.error('Error al buscar un usuario existente:', error);
//             next(); // Continúa al siguiente middleware o enrutador
//           });
// } 
// )

signUpGoogleRouter.get('/callback', (req, res, next) => {
    passport.authenticate('google', { failureRedirect: 'https://pf-teesa-front.vercel.app/signup', failureFlash: true }, (err, user) => {
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
            req.session.errorMessage = 'El usuario ya está registrado';
            return res.redirect('https://pf-teesa-front.vercel.app/signup');
          }
  
          User.create({ nombre: displayName, correo: emails[0].value, googleToken: accessToken, refreshToken, tipo: false })
            .then(newUser => {
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

signUpGoogleRouter.get('/api/getErrorMessage', (req, res) => {
    const errorMessage = req.session.errorMessage || '';
    req.session.errorMessage = ''; // Borra el mensaje después de enviarlo
  
    res.json({ errorMessage });
  });

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


module.exports = signUpGoogleRouter