
app.controller('userController', ['$scope','userFactory','$location','$routeParams', 'filepickerService',function($scope, userFactory, $location, $routeParams, filepickerService){
  var redirector = function(){
    $location.url('/dashboard')
  }

  $scope.check = 'good'
  var findOne = function (haystack, arr) {
    return arr.some(function (v) {
        return haystack.indexOf(v) >= 0;
    });
};
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

  $scope.logout = function (){
    filepicker.logout({
    onSuccess()
      { console.log('Logout Success!'); },
    onError(msg, status)
      { console.log('Logout Error: ', msg); },
    });
  }

  $scope.logout();

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
      $scope.filter = $scope.currentuser.journals
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
    console.log('we get here for sure!!!!!');
    if($scope.currentuser.journals.length >= 4){
      alert('You have already reached the maxiumum number of journals.')
    }else if($scope.currentuser.journals.length==0){
      userFactory.sendRequest(friend._id);
    }else if($scope.currentuser.journals.length>0) {
      if(findOne($scope.currentuser.journals[0]._id, friend.journals)){
        alert('You have already added this user.')
      }else{
      userFactory.sendRequest(friend._id);
      }

  }
}
  $scope.acceptRequest = function(friend){
    if($scope.currentuser.journals.length<4){
      userFactory.acceptRequest(friend, function(journal){
        $location.url('/journal/'+journal)
      });
    }
    else{
      console.log('I GOT HERE********');
      $scope.denyRequest(friend);
      alert('you already have four journals...');
    }
  }

  $scope.denyRequest = function(friend){
    userFactory.denyRequest(friend, $scope.getUser);
  }

}])
