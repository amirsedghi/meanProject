var mongoose = require('mongoose');
var User = mongoose.model('User');
var Journal = mongoose.model('Journal')
var Content = mongoose.model('Content')

module.exports = {
  newChapter: function(req,res){
    Journal.findOne({_id:req.params.id}, function(err, journal){
      if(err){
        res.status(500).send(err)
      }
      journal.chapter.push({name:req.body.chapter})
      journal.save(function(err){
        if(err){
          console.log('chapter was not saved');
        }else{
          for(var i =0; i<journal.chapter.length; i++){
            if(journal.chapter[i].name==req.body.chapter){
              res.json(journal.chapter[i]._id);
            }
          }
        }
      })
    })
  },

  newCategory: function(req,res){
    Journal.findOne({_id:req.params.id}, function(err, journal){
      if(err){
        res.status(500).send(err)
      }
      journal.category.push({name:req.body.category})
      journal.save(function(err){
        if(err){
          console.log(err);
        }else{
          for(var i =0; i<journal.category.length; i++){
            if(journal.category[i].name==req.body.category){
              res.json(journal.category[i]._id);
            }
          }
        }
      })
    })
  },

  getJournal: function(req,res){
    Journal.findOne({_id:req.params.id}).populate({path:'content', model:'Content'}).exec(function(err, journal){
      if(err){
        console.log('couldnt find journal');
      }else{
        res.json(journal);
      }
    })
  },

  newContent: function(req,res){
    Journal.findOne({_id:req.params.id}, function(err, journal){
      if(err){
        console.log(err)
      }else{
        var newcontent = new Content(req.body);
        newcontent.save(function(err){
          if(err){
            console.log(err)
          }else{
            journal.content.push(newcontent._id);
            journal.save(function(err){
              if(err){
                console.log(err)
              }else{
                res.status(200).send('Success!')
              }
            })
          }
        })
      }
    })
  }
}
