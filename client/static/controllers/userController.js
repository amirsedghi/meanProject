app.controller('userController', ['$scope','userFactory','$location','$routeParams', function($scope, userFactory, $location, $routeParams, filepickerService){
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
      $scope.currentuser = user;
      $scope.emptyjournals = 4-$scope.currentuser.journals.length;
      console.log($scope.emptyjournals)
    })
  }

  $scope.getNumber = function(num) {
    var arr=[]
    for(var i = 0; i<num;i++){
      arr.push(i);
    }
    return arr;
  }
  $scope.getUser();

  $scope.sendRequest = function(friend){
    userFactory.sendRequest(friend);
  }

  $scope.acceptRequest = function(friend){
    userFactory.acceptRequest(friend, function(journal){
      $location.url('/journal/'+journal)
    });
  }
  $scope.denyRequest = function(friend){
    userFactory.denyRequest(friend, $scope.getUser);
  }
}])
