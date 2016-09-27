var app = angular.module('myApp', ['ngRoute']);
app.config(function($routeProvider, $httpProvider){
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
  .otherwise({
    redirectTo: '/dashboard'
  })
})
