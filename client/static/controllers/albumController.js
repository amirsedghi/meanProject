app.controller('albumController', ['$scope','userFactory','$location','$routeParams','journalFactory', 'filepickerService', function($scope, userFactory, $location, $routeParams, journalFactory, filepickerService){

  console.log('do you even load');
  console.log($routeParams.id);

  $scope.get = function(){
    journalFactory.getContent($routeParams.id, function(data){
      console.log(data);
      $scope.image = data
      console.log($scope.image);
    })
  }

  $scope.get();

}])
