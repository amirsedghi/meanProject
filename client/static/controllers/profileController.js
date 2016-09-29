app.controller('profileController', ['$scope','userFactory','$location','$routeParams', 'filepickerService',  function($scope, userFactory, $location, $routeParams, filepickerService){

  // filepickerProvider.setKey('An73odSkVTOjjvkC0Sctwz');

  $scope.getUser = function(){
    userFactory.getUser(function(user){
      $scope.user = user
    })
  }

  $scope.uploadImage = function(){
    console.log('IT GETS HERE');
    filepickerService.pick(
      {
        mimetype: 'image/*',
        services: ['CONVERT','COMPUTER','GOOGLE_DRIVE','FACEBOOK', 'INSTAGRAM'],
        conversions: ['crop', 'rotate', 'filter']
      },
      function(image){
        console.log('HERE IS THE URL');
        console.log(image.url);
        $scope.user.picture = image.url;
        $scope.$apply();
        $scope.update();
        console.log('hahahahaha');
      }
    );

  };

  filepicker.setKey('ASH0I2MdTJe3ibleZLmXgz')

  $scope.gotIt = function(data){
    console.log('Finally something here...');
    console.log(data.url);
    $scope.image = data.url;
    console.log($scope.image);
  }

  $scope.update = function(){
    userFactory.updateUser($scope.user.picture, function(){
      $scope.getUser();
      $location.url('/home')
    })
  }

  $scope.getUser()
}])
