var mongoose = require('mongoose');
var User = mongoose.model('User');
var Journal = mongoose.model('Journal')

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
    User.findOne({_id: req.session.user._id}).populate({path:'requests',model:'User'}).populate({path:'journals',populate:[{path: '_friend1', model:'User'}, {path:'_friend2',model:'User'}]}).exec(function(err, user){
      if(err){
        res.sendStatus(400)
      } else{
        res.json(user)
      }
    })
  },

  getAllUsers: function(req,res){
    User.find({"_id":{"$ne":req.session.user._id}}, function(err, users){
      if(err){
        res.sendStatus(400)
      }else{
        res.json(users);
      }
    })
  },

  sendRequest: function(req,res){
    User.findOne({_id:req.params.id}, function(err, user){
      if(err){
        res.sendStatus(500)
      }else{
        console.log('success')
        user.requests.push(req.session.user._id);
        user.save(function(err){
          if (err){
            console.log(err)
          }else{
            res.status(200).send('success');
          }
        })

      }
    })
  },

  acceptRequest: function(req,res){
    User.findOne({_id:req.session.user._id}, function(err, user){
      if (err){
        res.sendStatus(500);
      }else{
        for(var i = 0; i < user.requests.length; i++){
          if(user.requests[i]==req.body.friend){
            user.requests.splice(i,1);
          }
        }
        user.save(function(err){
          if(err){
            console.log(err)
          }
        })
        var newjournal = new Journal({_friend1:req.session.user._id, _friend2:req.body.friend});
        newjournal.save(function(err){
          if(err){
            console.log(err)
            res.sendStatus(500);
          }else{

            user.journals.push(newjournal._id);
            user.save(function(err){
              if(err){
                console.log(err)
              }else{
                User.findOne({_id:req.body.friend}, function(err,user2){
                  if(err){
                    console.log(err)
                  }else{
                    user2.journals.push(newjournal._id);
                    user2.save(function(err){
                      if(err){
                        console.log(err)
                      }else{
                        res.json(newjournal._id);
                      }
                    })
                  }
                });
              }
            })
          }
        })
      }
    })
  },

  denyRequest: function(req,res){
      User.findOne({_id:req.session.user._id}, function(err, user){
        if (err){
          res.sendStatus(500);
        }else{
          for(var i = 0; i < user.requests.length; i++){
            if(user.requests[i]==req.body.friend){
              user.requests.splice(i,1);
            }
          }
          user.save(function(err){
            if(err){
              console.log(err)
            }else{
              res.status(200).send('successfully denied request')
            }
          });
        }
      })
  }

}
