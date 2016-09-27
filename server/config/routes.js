var user =require('../controllers/Users.js');

console.log('GOING THROUGH THE ROUTES');


module.exports = function(app){
  app.get('/', user.index);
  app.post('/register', user.register);
  app.post('/login', user.login);
  app.get('/logout', user.logout)
  app.use(authentication);
}



function authentication(req, res, next){
  if(req.session.user){
    next()
  } else{
    res.status(401).send("Permission denied...yeah...")
  }
}
