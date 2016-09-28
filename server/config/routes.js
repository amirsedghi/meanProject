var user =require('../controllers/Users.js');
var journal =require('../controllers/Journals.js');
console.log('GOING THROUGH THE ROUTES');


module.exports = function(app){
  app.get('/', user.index);
  app.post('/register', user.register);
  app.post('/login', user.login);
  app.get('/logout', user.logout)
  app.use(authentication);
  app.get('/getuser', user.getUser);
  app.get('/getallusers', user.getAllUsers);
<<<<<<< HEAD
  app.get('/getUser', user.getUser);
  app.post('/updateUser', user.update)
=======
  app.get('/request/:id', user.sendRequest);
  app.post('/acceptrequest', user.acceptRequest);
  app.post('/denyrequest', user.denyRequest);
>>>>>>> c522bc81e1b1aa3c59e76c495adffc72f31003c9
}



function authentication(req, res, next){
  if(req.session.user){
    next()
  } else{
    res.status(401).send("Permission denied...yeah...")
  }
}
