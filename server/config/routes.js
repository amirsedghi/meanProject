var user =require('../controllers/Users.js');

console.log('GOING THROUGH THE ROUTES');


module.exports = function(app){
  app.get('/', user.index);
  app.post('/register', user.register);
  app.post('/login', user.login);
  app.get('/logout', user.logout)
  app.use(authentication);
  app.get('/getuser', user.getUser);
  app.get('/getallusers', user.getAllUsers);
  app.get('/request/:id', user.sendRequest);
}



function authentication(req, res, next){
  if(req.session.user){
    next()
  } else{
    res.status(401).send("Permission denied...yeah...")
  }
}
