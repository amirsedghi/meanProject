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
        language: 'en',
        services: ['COMPUTER','GOOGLE_DRIVE','FACEBOOK', 'INSTAGRAM'],
        openTo: 'IMAGE_SERACH'
      },
      function(image){
        console.log(JSON.strigify(image));
        $scope.user.picture = image;
        $scope.$apply();
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
    userFactory.updateUser($scope.image, function(){
      $scope.getUser();
      $location.url('/home')
    })
  }

  $scope.getUser()
}])
