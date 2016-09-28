app.factory('userFactory', ['$http','$location', function($http, $location) {
  var factory = {};
  factory.register = function(user, callback1, callback2){
    $http({
      method: 'POST',
      url: '/register',
      data: user
    }).then(function() {
      callback1();
    }, function(){
      callback2('this email has been already used');
    });
  }

  factory.login = function(user, callback1, callback2){
    $http({
      method: 'POST',
      url: '/login',
      data: user
    }).then(function(){
      callback1()
      console.log('successful login');
    }, function(){
      callback2();
    });
  }

  factory.getUser = function(callback){
    $http({
      method:"GET",
      url:'/getUser',
    }).then(function(res){
      callback(res.data)
    }, function(){
      console.log('Could not get the user');
    })
  }

  factory.sendRequest = function(friend){
    $http({
      method:'GET',
      url:'/request/'+friend
    }).then(function(res){
      console.log('success')
      $location.url('/home')
    }),function(){
      console.log('couldnt create request')
    }
  }

  factory.getAllUsers = function(callback){
    $http({
      method:'GET',
      url:'/getallusers'
    }).then(function(res){
      callback(res);
    }), function(){
      console.log('could not get users');
    }
  }

<<<<<<< HEAD
  factory.updateUser = function(data, callback){
    console.log('HERE IS THE DATA OK...');
    console.log(data);
    $http({
      method: 'POST',
      url: '/updateUser',
      data: {image: data}
    }).then(function(){
      callback()
    }, function(){
      console.log('could not update the data');
    })
  }

=======
  factory.acceptRequest= function(friend, callback){
    $http({
      method:'post',
      url:'/acceptrequest',
      data:{friend:friend}
    }).then(function(res){
      callback(res.data);
    }), function(){
      console.log('couldnt accept');
    }
  }

  factory.denyRequest= function(friend, callback){
    $http({
      method:'post',
      url:'/denyrequest',
      data:{friend:friend}
    }).then(function(res){
      callback();
    }), function(){
      console.log('couldnt deny');
    }
  }
>>>>>>> c522bc81e1b1aa3c59e76c495adffc72f31003c9
  return factory;

}]);
