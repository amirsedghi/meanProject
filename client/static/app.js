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
  .when('/home',{
    templateUrl:'partials/home.html',
  })
  .when('/journal/:id',{
    templateUrl:'partials/journal.html'
  })
  .when('/journal/:id/newcontent',{
    templateUrl:'partials/createContent.html'
  })
  .otherwise({
    redirectTo: '/dashboard'
  })
})
