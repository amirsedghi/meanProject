var mongoose = require('mongoose');
var User = mongoose.model('User');


module.exports = {

  index: function(req, res){
    res.render('index')
  },

  register: function(req, res){
    console.log('DO YOU EVEN GET HERE?');
    console.log(req.body);
    User.findOne({email: req.body.email}, function(err, user){
      if(!user){
        var user = new User(req.body);
        console.log('WE GET HERE AND THE USER IS');
        console.log(user);
        user.save(function(err){
          if(err){
            console.log('could not register for some reason');
          } else{
            req.session.user = user;
            console.log('successfully registered a new user');
            res.sendStatus(200)
          }
        })
      } else {
        res.sendStatus(400)
      }
    })

  },

  login: function(req, res){
    User.findOne({email:req.body.email}, function(err, user){
      if(!user){
        console.log('no user found');
        res.sendStatus(400)
      } else{
        if(user.password == req.body.password){
          req.session.user = user
          res.sendStatus(200)
        } else{
          res.sendStatus(400)
        }
      }
    })
  },

  logout: function(req, res){
    req.session.destroy(function(err){
      if(err){
        res.sendStatus(400);
      } else{
        res.redirect('/')
      }
    })
  },

  getUser: function(req, res){
    User.findOne({_id: req.session.user._id}, function(err, user){
      if(err){
        res.sendStatus(400)
      } else{
        res.json(user)
      }
    })
  }

}
