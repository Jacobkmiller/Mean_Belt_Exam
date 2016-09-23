app.controller('questionidController',['$scope', '$http', 'userFactory', '$routeParams', function($scope, $http, userFactory, $routeParams){
    function getQuestion(id){
      userFactory.getQuestion(id, function(question) {
        $scope.question = question;
        console.log("Question is");
        console.log(question);
      })
    };
    $scope.likeAnswer = function(id){
      userFactory.likeAnswer(id, getQuestion)
    }
    getQuestion($routeParams.id);
}]);
