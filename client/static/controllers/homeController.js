app.controller('homeController',['$scope', '$http', 'userFactory', function($scope, $http, userFactory){
    function getUser(){
        userFactory.getUser(function(user){
            $scope.user = user.data;
            console.log(user);
        });
    };
    function getQuestions(){
      userFactory.getQuestions(function(questions){
        $scope.questions = questions;
        console.log( "questions");
        console.log(questions.data);
      })
    }
    getUser();
    getQuestions();
}]);
