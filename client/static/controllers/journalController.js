app.controller('journalController', ['$scope','userFactory','$location','$routeParams','journalFactory', function($scope, userFactory, $location, $routeParams, journalFactory){

  $scope.getjournalanduser = function(){
    journalFactory.getJournal($routeParams.id,function(data){
      $scope.journal = data
    })
    userFactory.getUser(function(data){
      $scope.user = data;
    })
  }

  $scope.newContent = function(content){
    if(content.newchapter){
      journalFactory.newChapter(content.newchapter, $scope.journal._id, function(res){
        console.log('success')
        $scope.chapter = res;
      })
    }else{
      $scope.chapter = content.existingChapter
    }
    if(content.newCategory){
      journalFactory.newCategory(content.newCategory, $scope.journal._id, function(res){
        console.log('success')
        $scope.category = res;
      })
    }else{
      $scope.chapter = content.existingCategory
    }
    var newcontent = {
      chapter:$scope.chapter,
      category:$scope.category,
      title:content.title,
      description:content.desc,
      images:[]
    }
    journalFactory.newContent(newcontent,$scope.journal._id,function(){
      $location.url('/journal/'+$routeParams.id)
    })
  }

}])
