app.controller('journalController', ['$scope','userFactory','$location','$routeParams','journalFactory', 'filepickerService', function($scope, userFactory, $location, $routeParams, journalFactory, filepickerService){

console.log('do you even get here??');

  $scope.chapterfilter =''

  $scope.getjournalanduser = function(){
    journalFactory.getJournal($routeParams.id,function(data){
      $scope.journal = data
    })
    if($routeParams.chapter){
      $scope.chapterfilter = $routeParams.chapter
    }
    userFactory.getUser(function(data){
      $scope.user = data;
    })
  }

  $scope.getUser = function(){
    userFactory.getUser(function(data){
      $scope.user = data;
    })
  }

  $scope.getUser()

  $scope.newContent = function(content){
    if(content.newchapter){
      journalFactory.newChapter(content.newchapter, $scope.journal._id, function(res){
        console.log('success')
        console.log(res)
        $scope.chapter = res;
        if(content.newCategory){
          journalFactory.newCategory(content.newCategory, $scope.journal._id, function(res){
            console.log('success')
            $scope.category = res;
            console.log($scope.chapter)
            var newcontent = {
              _user: $scope.user._id,
              chapter:$scope.chapter,
              category:$scope.category,
              title:content.title,
              description:content.desc,
              images:[]
            }
            console.log(newcontent)
            console.log(newcontent.chapter)
            for (var i in $scope.allImages){
              newcontent.images.push($scope.allImages[i])
            }

            journalFactory.newContent(newcontent,$scope.journal._id,function(){
              $location.url('/journal/'+$routeParams.id)
            })
          })
        }else{
          $scope.category = content.existingCategory;
          console.log($scope.chapter)
          var newcontent = {
            _user: $scope.user._id,
            chapter:$scope.chapter,
            category:$scope.category,
            title:content.title,
            description:content.desc,
            images:[]
          }
          console.log(newcontent)
          console.log(newcontent.chapter)
          for (var i in $scope.allImages){
            newcontent.images.push($scope.allImages[i])
          }

          journalFactory.newContent(newcontent,$scope.journal._id,function(){
            $location.url('/journal/'+$routeParams.id)
          })
        }
      })
    }


    else{
      $scope.chapter = content.existingChapter;
      if(content.newCategory){
        journalFactory.newCategory(content.newCategory, $scope.journal._id, function(res){
          console.log('success')
          $scope.category = res;
          console.log($scope.chapter)
          var newcontent = {
            _user: $scope.user._id,
            chapter:$scope.chapter,
            category:$scope.category,
            title:content.title,
            description:content.desc,
            images:[]
          }
          console.log(newcontent)
          console.log(newcontent.chapter)
          for (var i in $scope.allImages){
            newcontent.images.push($scope.allImages[i])
          }

          journalFactory.newContent(newcontent,$scope.journal._id,function(){
            $location.url('/journal/'+$routeParams.id)
          })
        })
      }else{
        $scope.category = content.existingCategory
        console.log($scope.chapter)
        var newcontent = {
          _user: $scope.user._id,
          chapter:$scope.chapter,
          category:$scope.category,
          title:content.title,
          description:content.desc,
          images:[]
        }
        console.log(newcontent)
        console.log(newcontent.chapter)
        for (var i in $scope.allImages){
          newcontent.images.push($scope.allImages[i])
        }

        journalFactory.newContent(newcontent,$scope.journal._id,function(){
          $location.url('/journal/'+$routeParams.id)
        })
      }
    }


  }

  $scope.allImages = []

  $scope.uploadMany = function(){
    console.log('relax...it gets here');
    filepickerService.pickMultiple(
      {
        mimetype: 'image/*',
        maxFiles: 10,
        services: ['CONVERT','COMPUTER','GOOGLE_DRIVE','FACEBOOK', 'INSTAGRAM'],
        conversions: ['crop', 'rotate', 'filter']
      },
      function(images){
        for (var a in images){
          $scope.allImages.push(images[a].url)
        }
        console.log($scope.allImages)
      }
    )
  }

  $scope.test = function(){
    console.log('JUST ANOTHER TEST');
  }

  filepicker.setKey('ASH0I2MdTJe3ibleZLmXgz')

}])
