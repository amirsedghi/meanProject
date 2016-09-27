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

  return factory;

}]);
