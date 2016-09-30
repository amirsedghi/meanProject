app.factory('journalFactory', ['$http','$location', function($http, $location) {
  var factory = {};

  factory.newChapter = function(chapter,journalid, callback){
    $http({
      method:'post',
      url:'/journal/'+journalid+'/newChapter',
      data:{chapter:chapter}
    }).then(function(res){
      console.log(res)
      callback(res.data)
    }), function(){
      console.log('Something wrong')
    }
  }

  factory.newCategory = function(category,journalid, callback){
    $http({
      method:'post',
      url:'/journal/'+journalid+'/newCategory',
      data:{category:category}
    }).then(function(res){
      callback(res.data)
    }), function(){
      console.log('Something wrong')
    }
  }

  factory.getJournal = function(journal, callback){
    $http({
      method:"GET",
      url:'/getjournal/'+journal
    }).then(function(res){
      callback(res.data)
    }, function(){
      console.log('Could not get the user');
    })
  }

  factory.newContent = function(newcontent,journalid, callback){
    $http({
      method:"post",
      url:"/journal/"+journalid+"/newcontent",
      data:newcontent
    }).then(function(res){
      callback();
    }), function(){
      console.log('content save error!')
    }
  }

  factory.getContent = function(id, callback){
    $http({
      method:'get',
      url:'/content/'+id
    }).then(function(res){
      callback(res.data)
    }, function(){
      console.log('sorry buddy...could not get the content');
    })
  }

  return factory;
  }])
