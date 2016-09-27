app.controller('userController', ['$scope','userFactory','$location','$routeParams', function($scope, userFactory, $location, $routeParams){
  var redirector = function(){
    $location.url('/dashboard')
  }

  $scope.check = 'good'

  $scope.register = function(user){
    $scope.response = ''
    userFactory.register(user, function(){
      console.log('you have successfully registered');
      $location.url('/home')
    }, function(res){
      $scope.newUser = {}
      $scope.checking = {}
      $scope.response = res;
    })
  }

  $scope.login = function(user){
    userFactory.login(user, function(){
      $scope.check = 'good'
      $location.url('/home')
    }, function(){
      $scope.user = {}
      $scope.check = 'bad'
    })
  }

  $scope.allusers = []

  $scope.getAllUsers = function(){
    userFactory.getAllUsers(function(res){
      $scope.allusers = res.data;
    })
  }

  $scope.getUser = function(){
    userFactory.getUser(function(user){
      $scope.user = user
    })
  }

}])
