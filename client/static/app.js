var app = angular.module('myApp', ['ngRoute', 'angular-filepicker']);
app.config(function($routeProvider, $httpProvider, filepickerProvider){
  $httpProvider.interceptors.push(
        function($q, $location) {
        return {
            'responseError':function(rejection){
            if (rejection.status == 401){
                $location.url('/');
            }
            return $q.reject(rejection);
        }
        };
    });
  $routeProvider
  .when('/', {
    templateUrl: 'partials/login.html',
    controller: 'userController'
  })
  .when('/home',{
    templateUrl:'partials/home.html',
  })
  .when('/profile',{
    templateUrl:'partials/profile.html',
    controller: 'profileController'
  })
  .otherwise({
    redirectTo: '/dashboard'
  })

  filepickerProvider.setKey('ASH0I2MdTJe3ibleZLmXgz');


})
