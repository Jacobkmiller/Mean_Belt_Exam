

app.factory("userFactory", ["$http", '$q', '$location', '$routeParams', function($http, $q, $location, $routeParams){
    var users = {data:[]};
    var factory = {};

    factory.registerUser = function(user){
      console.log(user);
        $http({
            method:"POST",
            url:'/register',
            data:user
        }).then(function(res){
              $location.url('/home')
        })
    };
    factory.loginUser = function(user, callback){
      $http({
        url:'/login',
        method:'POST',
        data: user
      }).then(function(res){
          $location.url('/home')
      },function(res){
        callback(res);
      })
    };
    factory.getUser = function(callback){
      $http({
        url:'/user',
        method:'GET'
      }).then(function(user){
        callback(user);
      })
    };
    // end admin user functions
    factory.postQuestion = function(question){
      console.log(question);
        $http({
            method:"POST",
            url:'/question',
            data:question
        }).then(function(res){
              $location.url('/home')
        })
    };
    factory.getQuestions = function(callback){
      $http({
          method:"GET",
          url:'/questions',
      }).then(function(res){
            callback(res.data)
      })
    };
    factory.getQuestion = function(id, callback){
      $http({
          method:"GET",
          url:'/question/'+id,
      }).then(function(res){
            callback(res.data)
      })
    };
    factory.postAnswer = function(answer, id){
      console.log("user factory attempting http post to answer");
      $http({
          method:"POST",
          url:'/answer/'+id,
          data: answer
      }).then(function(res){
          $location.url('/home')
      })
    };
    factory.likeAnswer = function(id, callback){
      $http({
          method:"GET",
          url:'/answerlike/' + id
      }).then(function(res){
          callback($routeParams.id)
      })
    };



    return factory;
}])
